import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CoreState} from '../../store/reducers/global.reducers';

@Component({
	selector: 'app-salas',
	templateUrl: './salas.component.html',
	styleUrls: ['./salas.component.scss']
})
export class SalasComponent implements OnInit {

	constructor(private store: Store<CoreState>) {
	}

	ngOnInit() {
	}

}
