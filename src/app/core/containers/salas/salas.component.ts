import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {CriarSala} from '../../store/actions/sala.action';
import {CoreState} from '../../store/reducers/global.reducers';

@Component({
	selector: 'app-salas',
	templateUrl: './salas.component.html',
	styleUrls: ['./salas.component.scss']
})
export class SalasComponent {

	constructor(private store: Store<CoreState>) {
	}

	create() {
		this.store.dispatch(new CriarSala());
	}
}
