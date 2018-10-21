import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {from, of} from 'rxjs';
import {catchError, map, mergeMap, pluck, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {Sala} from '../../models/sala.model';
import {Usuario} from '../../models/usuario.model';
import {
	CRIAR_SALA,
	CRIAR_SALA_FAIL,
	CRIAR_SALA_SUCCESS,
	CriarSalaFail,
	CriarSalaSuccess,
	OBSERVAR_SALA_SUBSCRIBE,
	OBSERVAR_SALA_UNSUBSCRIBE,
	ObservarSalaError,
	ObservarSalaNext,
	ObservarSalaSubscribe
} from '../actions/sala.action';
import {ShowSnackBar} from '../actions/snack-bar.action';
import {CoreState} from '../reducers/global.reducers';
import {getUsuario} from '../selectors/usuario.selectors';

@Injectable()
export class SalaEffects {

	constructor(private actions$: Actions, private db: AngularFirestore, private router: Router, private store: Store<CoreState>) {
	}

	@Effect()
	criarSala$ = this.actions$.pipe(
		ofType(CRIAR_SALA),
		withLatestFrom(this.store.pipe(select(getUsuario))),
		switchMap(([action, usuario]: [Action, Usuario]) => {
			const id = this.db.createId();
			const sala = {id, codigoAcesso: id.substr(0, 4), jogador1: usuario};

			return from(this.db.doc(`salas/${id}`).set(sala)).pipe(
				map(() => new CriarSalaSuccess(sala)),
				catchError((error) => of(new CriarSalaFail(error))),
			);
		}),
	);


	@Effect()
	criarSalaSuccess$ = this.actions$.pipe(
		ofType(CRIAR_SALA_SUCCESS),
		pluck('payload'),
		tap((sala: Sala) => this.router.navigate(['core', 'game', 'sala', sala.id])),
		mergeMap((sala: Sala) => from([new ObservarSalaSubscribe(sala.id), new ShowSnackBar({
			mensagem: 'Sala criada com sucesso',
			config: {duration: 3000, panelClass: ['mat-snack-bar-primary']}
		})])),
	);

	@Effect()
	criarSalaFail$ = this.actions$.pipe(
		ofType(CRIAR_SALA_FAIL),
		map(() => new ShowSnackBar({
			mensagem: 'Ops, ocorreu um problema ao tentar criar sua sala.',
			config: {duration: 3000, panelClass: ['mat-snack-bar-warn']}
		})),
	);

	@Effect()
	observeSalaSubscribe$ = this.actions$.pipe(
		ofType(OBSERVAR_SALA_SUBSCRIBE),
		pluck('payload'),
		switchMap((payload) => this.db.doc(`salas/${payload}`).valueChanges().pipe(
			map((sala: Sala) => new ObservarSalaNext(sala)),
			catchError((err) => of(new ObservarSalaError(err))),
			takeUntil(this.actions$.pipe(ofType(OBSERVAR_SALA_UNSUBSCRIBE))),
		)),
	);

}
