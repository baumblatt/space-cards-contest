import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map, startWith, take} from 'rxjs/operators';
import {Sair} from '../../store/actions/usuario.action';
import {UsuarioState} from '../../store/reducers/usuario-reducer';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

	@ViewChild('drawer')
	drawer;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			startWith(true),
		);

	constructor(private breakpointObserver: BreakpointObserver, private store: Store<UsuarioState>) {
	}

	activated() {
		this.isHandset$.pipe(
			take(1),
			filter((flag: boolean) => flag),
		).subscribe(() => this.drawer.close());
	}

	sair() {
		this.store.dispatch(new Sair());
		this.activated();
	}
}
