import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {CriarSala, EntrarSala} from '../../store/actions/sala.action';
import {CoreState} from '../../store/reducers/global.reducers';

@Component({
	selector: 'app-salas',
	templateUrl: './salas.component.html',
	styleUrls: ['./salas.component.scss']
})
export class SalasComponent {

	constructor(private store: Store<CoreState>) {
	}

	criar() {
		this.store.dispatch(new CriarSala());
	}

	entrar() {
		this.store.dispatch(new EntrarSala());
	}


}
