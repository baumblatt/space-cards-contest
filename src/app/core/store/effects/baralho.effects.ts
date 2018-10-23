import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap, pluck, switchMap, withLatestFrom} from 'rxjs/operators';
import {Mao} from '../../models/mao.model';
import {Mesa} from '../../models/mesa.model';
import {Sala} from '../../models/sala.model';
import {
	ENVIAR_CRITERIO,
	ENVIAR_CRITERIO_FAIL,
	EnviarCriterioFail,
	EnviarCriterioSuccess,
	ObservarMaoError,
	ObservarMaoNext,
	ObservarMesaError,
	ObservarMesaNext
} from '../actions/baralho.action';
import {ShowSnackBar} from '../actions/snack-bar.action';
import {CoreState} from '../reducers/global.reducers';
import {getProximoCriterio} from '../selectors/baralho.selectors';
import {getSala, getSlot} from '../selectors/sala.selectors';

@Injectable()
export class BaralhoEffects {

	constructor(private actions$: Actions, private db: AngularFirestore, private fns: AngularFireFunctions, private store: Store<CoreState>) {
	}

	@Effect()
	mao = this.store.pipe(select(getSlot)).pipe(
		switchMap(slot => {
			if (!slot) {
				return EMPTY;
			}

			return this.db.collection(`salas/${slot.sala}/${slot.jogador}`,
				ref => ref.orderBy('rodada', 'desc').limit(1)).valueChanges().pipe(
				mergeMap(documents => documents),
				map((document: Mao) => new ObservarMaoNext(document)),
				catchError((err) => of(new ObservarMaoError(err))),
			);
		})
	);

	@Effect()
	mesa = this.store.pipe(select(getSala)).pipe(
		switchMap(sala => {
			if (!sala || !sala.id || !sala.iniciado) {
				return EMPTY;
			}

			return this.db.collection(`salas/${sala.id}/mesa`,
				ref => ref.orderBy('rodada', 'desc').limit(1)).valueChanges().pipe(
				mergeMap(documents => documents),
				map((document: Mesa) => new ObservarMesaNext(document)),
				catchError((err) => of(new ObservarMesaError(err))),
			);
		})
	);

	@Effect()
	enviarCriterio$ = this.actions$.pipe(
		ofType(ENVIAR_CRITERIO),
		withLatestFrom(this.store.pipe(select(getSala)), this.store.pipe(select(getProximoCriterio))),
		switchMap(([action, sala, criterio]: [Action, Sala, string]) => {
			return this.fns.httpsCallable('enviarCriterio')({sala, criterio}).pipe(
				map((result) => new EnviarCriterioSuccess(result)),
				catchError((error) => of(new EnviarCriterioFail(error))),
			);
		}),
	);

	@Effect()
	enviarCriterioFail$ = this.actions$.pipe(
		ofType(ENVIAR_CRITERIO_FAIL),
		pluck('payload'),
		map(() => new ShowSnackBar({
			mensagem: 'Ops, something wrong handling your turn, please refresh and try again.',
			config: {duration: 2000, panelClass: ['mat-snack-bar-warn']}
		})),
	);
}
