import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Entrar} from '../../store/actions/usuario.action';
import {CoreState} from '../../store/reducers/global.reducers';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private store: Store<CoreState>) {
	}

	ngOnInit() {
	}

	entrar(provider) {
		this.store.dispatch(new Entrar(provider));
	}

}
