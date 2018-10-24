import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {EMPTY, from, of} from 'rxjs';
import {catchError, distinctUntilKeyChanged, filter, map, mergeMap, pluck, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {SalaDialogComponent} from '../../components/sala-dialog/sala-dialog.component';
import {Sala} from '../../models/sala.model';
import {Usuario} from '../../models/usuario.model';
import {HideLoading, POR_FAVOR_AGUARDE, ShowLoading} from '../actions/loading.action';
import {
	CRIAR_SALA,
	CRIAR_SALA_FAIL,
	CRIAR_SALA_SUCCESS,
	CriarSalaFail,
	CriarSalaSuccess,
	ENTRAR_SALA,
	ENTRAR_SALA_FAIL,
	ENTRAR_SALA_SUCCESS,
	EntrarSalaFail,
	EntrarSalaSuccess,
	INICIAR_JOGO,
	INICIAR_JOGO_FAIL,
	INICIAR_JOGO_SUCCESS,
	IniciarJogoFail,
	IniciarJogoSuccess,
	ObservarSalaError,
	ObservarSalaNext
} from '../actions/sala.action';
import {ShowSnackBar} from '../actions/snack-bar.action';
import {CoreState} from '../reducers/global.reducers';
import {getSala} from '../selectors/sala.selectors';
import {getUsuario} from '../selectors/usuario.selectors';

@Injectable()
export class SalaEffects {

	constructor(private actions$: Actions, private db: AngularFirestore, private fns: AngularFireFunctions,
				private dialog: MatDialog, private router: Router, private store: Store<CoreState>) {

		if (!environment.production) {
			// @ts-ignore
			this.fns.functions.useFunctionsEmulator('http://localhost:5001');
		}

	}

	@Effect()
	criarSala$ = this.actions$.pipe(
		ofType(CRIAR_SALA),
		withLatestFrom(this.store.pipe(select(getUsuario))),
		tap(() => this.store.dispatch(new ShowLoading(POR_FAVOR_AGUARDE))),
		switchMap(([action, usuario]: [Action, Usuario]) => {
			const id = this.db.createId();
			const sala = {id, codigoAcesso: id.substr(0, 4), jogador1: usuario, iniciado: false};

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
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'Room created successfully',
			config: {duration: 3000, panelClass: ['mat-snack-bar-primary']}
		})])),
	);

	@Effect()
	criarSalaFail$ = this.actions$.pipe(
		ofType(CRIAR_SALA_FAIL),
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'Ops, unable to create the room, try again later.',
			config: {duration: 3000, panelClass: ['mat-snack-bar-warn']}
		})])),
	);

	@Effect()
	entrarSala$ = this.actions$.pipe(
		ofType(ENTRAR_SALA),
		switchMap(() => this.dialog.open(SalaDialogComponent, {
			width: '300px',
			disableClose: true
		}).afterClosed()),
		filter(codigoAcesso => !!codigoAcesso),
		tap(() => this.store.dispatch(new ShowLoading(POR_FAVOR_AGUARDE))),
		withLatestFrom(this.store.pipe(select(getUsuario))),
		switchMap(([codigoAcesso, jogador]: [string, Usuario]) => {
			return this.fns.httpsCallable('entrarSala')({codigoAcesso, jogador}).pipe(
				map(retorno => (retorno.code === 'unavailable') ? new EntrarSalaFail(retorno) : new EntrarSalaSuccess(retorno)),
				catchError((err) => of(new EntrarSalaFail(err))),
			);
		}),
	);

	@Effect()
	entrarSalaSuccess$ = this.actions$.pipe(
		ofType(ENTRAR_SALA_SUCCESS),
		pluck('payload'),
		tap((sala: Sala) => this.router.navigate(['core', 'game', 'sala', sala.id])),
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'Join the room successfully',
			config: {duration: 3000, panelClass: ['mat-snack-bar-primary']}
		})])),
	);

	@Effect()
	entrarSalaFail$ = this.actions$.pipe(
		ofType(ENTRAR_SALA_FAIL),
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'Ops, unable to join the room, try again later.',
			config: {duration: 3000, panelClass: ['mat-snack-bar-warn']}
		})])),
	);

	@Effect()
	iniciarJogo$ = this.actions$.pipe(
		ofType(INICIAR_JOGO),
		pluck('payload'),
		tap(() => this.store.dispatch(new ShowLoading(POR_FAVOR_AGUARDE))),
		switchMap((sala) => this.fns.httpsCallable('iniciarJogo')(sala).pipe(
			map((result) => new IniciarJogoSuccess(result)),
			catchError((error) => of(new IniciarJogoFail(error))),
		)),
	);

	@Effect()
	iniciarJogoSuccess$ = this.actions$.pipe(
		ofType(INICIAR_JOGO_SUCCESS),
		pluck('payload'),
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'The game was started successfully',
			config: {duration: 6000, panelClass: ['mat-snack-bar-primary']}
		})])),
	);

	@Effect()
	iniciarJogoFail$ = this.actions$.pipe(
		ofType(INICIAR_JOGO_FAIL),
		pluck('payload'),
		mergeMap(() => from([new HideLoading(), new ShowSnackBar({
			mensagem: 'Ops, failure starting the game, try again later',
			config: {duration: 6000, panelClass: ['mat-snack-bar-warn']}
		})])),
	);

	@Effect()
	sala = this.store.pipe(
		select(getSala),
		filter(sala => !!sala),
		distinctUntilKeyChanged('id'),
		switchMap(sala => {
			if (!sala || !sala.id) {
				return EMPTY;
			}

			return this.db.doc(`salas/${sala.id}`).valueChanges().pipe(
				map((document: Sala) => new ObservarSalaNext(document)),
				catchError((err) => of(new ObservarSalaError(err))),
			);
		})
	);

}
