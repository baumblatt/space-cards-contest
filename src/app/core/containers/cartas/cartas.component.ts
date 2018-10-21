import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Carta} from '../../models/carta.model';
import {CartasState} from '../../store/reducers/cartas.reducer';
import {getCartas} from '../../store/selectors/cartas.selectors';

@Component({
	selector: 'app-cartas',
	templateUrl: './cartas.component.html',
	styleUrls: ['./cartas.component.scss']
})
export class CartasComponent implements OnInit {

	cartas$: Observable<Carta[]>;

	constructor(private store: Store<CartasState>) {
	}

	ngOnInit() {
		this.cartas$ = this.store.pipe(
			select(getCartas),
			map(cartas => cartas.filter(carta => !!carta.thumbnail)),
		);
	}
}
