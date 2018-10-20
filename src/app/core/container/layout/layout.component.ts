import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Sair} from '../../store/actions/usuario.action';
import {UsuarioState} from '../../store/reducers/usuario-reducer';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			startWith(true),
		);

	constructor(private breakpointObserver: BreakpointObserver, private store: Store<UsuarioState>) {
	}

	sair() {
		this.store.dispatch(new Sair());
	}
}
