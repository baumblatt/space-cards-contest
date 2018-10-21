import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Mao} from '../../models/mao.model';
import {Sala} from '../../models/sala.model';
import {IniciarJogo} from '../../store/actions/sala.action';
import {SalaState} from '../../store/reducers/sala.reducer';
import {getMao} from '../../store/selectors/baralho.selectors';
import {getSala} from '../../store/selectors/sala.selectors';

@Component({
	selector: 'app-sala',
	templateUrl: './sala.component.html',
	styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

	sala$: Observable<Sala>;

	mao$: Observable<Mao>;

	constructor(private store: Store<SalaState>) {
	}

	ngOnInit() {
		this.sala$ = this.store.pipe(select(getSala));
		this.mao$ = this.store.pipe(select(getMao));
	}

	iniciar(sala: Sala) {
		this.store.dispatch(new IniciarJogo(sala));
	}
}
