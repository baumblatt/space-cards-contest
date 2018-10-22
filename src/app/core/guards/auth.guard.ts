import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {User} from 'firebase';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {UsuarioState} from '../store/reducers/usuario-reducer';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private fireAuth: AngularFireAuth, private store: Store<UsuarioState>, private router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.fireAuth.authState.pipe(
			map((userInfo: User) => !!userInfo),
			tap(isAuth => {
				if (!isAuth) {
					this.router.navigate(['/core', 'login']).catch();
				}
			}),
		);
	}
}
