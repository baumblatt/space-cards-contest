import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CoreState} from '../../store/reducers/global.reducers';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private store: Store<CoreState>) {
	}

	ngOnInit() {
	}

}
