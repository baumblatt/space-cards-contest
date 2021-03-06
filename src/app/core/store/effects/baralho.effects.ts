import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {MatDialog} from '@angular/material';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {EMPTY, from, of} from 'rxjs';
import {catchError, exhaustMap, filter, map, mergeMap, pluck, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {RodadaDialogComponent} from '../../components/rodada-dialog/rodada-dialog.component';
import {Mao} from '../../models/mao.model';
import {Mesa} from '../../models/mesa.model';
import {Sala} from '../../models/sala.model';
import {
	ENVIAR_CRITERIO,
	ENVIAR_CRITERIO_FAIL,
	ENVIAR_CRITERIO_SUCCESS,
	EnviarCriterioFail,
	EnviarCriterioSuccess,
	OBSERVAR_MESA_NEXT,
	ObservarMaoError,
	ObservarMaoNext,
	ObservarMesaError,
	ObservarMesaNext
} from '../actions/baralho.action';
import {HideLoading, POR_FAVOR_AGUARDE, ShowLoading} from '../actions/loading.action';
import {ShowSnackBar} from '../actions/snack-bar.action';
import {CoreState} from '../reducers/global.reducers';
import {getProximoCriterio} from '../selectors/baralho.selectors';
import {getSala, getSlot} from '../selectors/sala.selectors';

@Injectable()
export class BaralhoEffects {

	constructor(private actions$: Actions, private db: AngularFirestore, private fns: AngularFireFunctions, public dialog: MatDialog,
				private store: Store<CoreState>) {
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

	@Effect({dispatch: false})
	observarMesaNext$ = this.actions$.pipe(
		ofType(OBSERVAR_MESA_NEXT),
		pluck('payload'),
		filter((mesa: Mesa) => mesa.rodada > 0),
		switchMap(mesa => this.dialog.open(RodadaDialogComponent, {
			data: mesa,
			closeOnNavigation: true,
			disableClose: true,
			width: '100vw',
			maxWidth: '100vw',
		}).afterClosed())
	);

	@Effect()
	enviarCriterio$ = this.actions$.pipe(
		ofType(ENVIAR_CRITERIO),
		tap(() => this.store.dispatch(new ShowLoading(POR_FAVOR_AGUARDE))),
		withLatestFrom(this.store.pipe(select(getSala)), this.store.pipe(select(getProximoCriterio))),
		exhaustMap(([action, sala, criterio]: [Action, Sala, string]) => {
			return this.fns.httpsCallable('enviarCriterio')({sala, criterio}).pipe(
				map((result) => new EnviarCriterioSuccess(result)),
				catchError((error) => of(new EnviarCriterioFail(error))),
			);
		}),
	);

	@Effect()
	enviarCriterioSuccess$ = this.actions$.pipe(
		ofType(ENVIAR_CRITERIO_SUCCESS),
		pluck('payload'),
		map(() => new HideLoading()),
	);

	@Effect()
	enviarCriterioFail$ = this.actions$.pipe(
		ofType(ENVIAR_CRITERIO_FAIL),
		pluck('payload'),
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'Ops, something wrong handling your turn, please refresh and try again.',
			config: {duration: 2000, panelClass: ['mat-snack-bar-warn']}
			})]),
		)
	);
}
