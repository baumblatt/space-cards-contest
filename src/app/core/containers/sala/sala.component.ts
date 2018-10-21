import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Sala} from '../../models/sala.model';
import {SalaState} from '../../store/reducers/sala.reducer';
import {getSala} from '../../store/selectors/sala.selectors';

@Component({
	selector: 'app-sala',
	templateUrl: './sala.component.html',
	styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

	sala$: Observable<Sala>;

	constructor(private store: Store<SalaState>) {
	}

	ngOnInit() {
		this.sala$ = this.store.pipe(select(getSala));
	}
}
