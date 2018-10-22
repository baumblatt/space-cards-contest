import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Mao} from '../../models/mao.model';
import {Sala} from '../../models/sala.model';
import {EnviarCriterio, EscolherCriterio} from '../../store/actions/baralho.action';
import {IniciarJogo} from '../../store/actions/sala.action';
import {SalaState} from '../../store/reducers/sala.reducer';
import {getMao, getProximoCriterio} from '../../store/selectors/baralho.selectors';
import {getSala} from '../../store/selectors/sala.selectors';

@Component({
	selector: 'app-sala',
	templateUrl: './sala.component.html',
	styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

	sala$: Observable<Sala>;

	mao$: Observable<Mao>;

	proximoCriterio$: Observable<string>;

	constructor(private store: Store<SalaState>) {
	}

	ngOnInit() {
		this.sala$ = this.store.pipe(select(getSala));
		this.mao$ = this.store.pipe(select(getMao));
		this.proximoCriterio$ = this.store.pipe(select(getProximoCriterio));
	}

	iniciar(sala: Sala) {
		this.store.dispatch(new IniciarJogo(sala));
	}

	escolher(criterio: string) {
		this.store.dispatch(new EscolherCriterio(criterio));
	}

	enviar() {
		this.store.dispatch(new EnviarCriterio());
	}
}
