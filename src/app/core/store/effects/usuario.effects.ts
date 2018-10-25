import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {from, of} from 'rxjs';
import {catchError, exhaustMap, map, pluck, tap} from 'rxjs/operators';
import {
	AtualizarUsuario,
	ENTRAR,
	ENTRAR_SUCCESS,
	EntrarFail,
	EntrarSuccess,
	SAIR,
	SAIR_SUCCESS,
	SairFail,
	SairSuccess
} from '../actions/usuario.action';

@Injectable()
export class UsuarioEffects {
	constructor(private actions$: Actions, private fireAuth: AngularFireAuth, private router: Router) {
	}

	@Effect()
	atualizar = this.fireAuth.authState.pipe(
		map((userInfo: User) => {
			if (!userInfo) {
				return {};
			}

			const {uid, providerId, displayName, photoURL, phoneNumber, email} = userInfo;
			return {uid, providerId, displayName, photoURL, phoneNumber, email};
		}),
		map(usuario => new AtualizarUsuario(usuario)),
	);

	@Effect()
	entrar$ = this.actions$.pipe(
		ofType(ENTRAR),
		pluck('payload'),
		map((provider) => {
			switch (provider) {
				case 'twitter':
					return new firebase.auth.TwitterAuthProvider();
				case 'facebook':
					return new firebase.auth.FacebookAuthProvider();
				default:
					return new firebase.auth.GoogleAuthProvider();
			}
		}),
		exhaustMap((provider) =>
			from(this.fireAuth.auth.signInWithPopup(provider)).pipe(
				map(result => result.user),
				map((userInfo: User) => {
					if (!userInfo) {
						return {};
					}

					const {uid, providerId, displayName, photoURL, phoneNumber, email} = userInfo;
					return {uid, providerId, displayName, photoURL, phoneNumber, email};
				}),
				map(usuario => new EntrarSuccess(usuario)),
				catchError((error) => of(new EntrarFail(error)))
			)
		)
	);

	@Effect({dispatch: false})
	entrarSuccess$ = this.actions$.pipe(
		ofType(ENTRAR_SUCCESS),
		tap(() => {
			return this.router.navigate(['/core', 'game']).catch(console.log);
		})
	);

	@Effect()
	sair$ = this.actions$.pipe(
		ofType(SAIR),
		exhaustMap(() => from(this.fireAuth.auth.signOut()).pipe(
			map(() => new SairSuccess()),
			catchError((error) => {
				return of(new SairFail(error));
			})
		))
	);

	@Effect({dispatch: false})
	sairSuccess$ = this.actions$.pipe(
		ofType(SAIR_SUCCESS),
		tap(() => {
			return this.router.navigate(['/core', 'login']).catch(console.log);
		})
	);

}
