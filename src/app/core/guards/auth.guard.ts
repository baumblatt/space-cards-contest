import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {UsuarioState} from '../store/reducers/usuario-reducer';
import {isUsuarioAutenticado} from '../store/selectors/usuario.selectors';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private store: Store<UsuarioState>, private router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.store.pipe(
			select(isUsuarioAutenticado),
			filter(isAuth => isAuth !== undefined),
			tap(isAuth => {
				if (!isAuth) {
					this.router.navigate(['/core', 'login']).catch();
				}
			}),
		);
	}
}
