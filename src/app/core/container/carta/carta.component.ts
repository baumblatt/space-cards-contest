import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {Carta} from '../../models/carta.model';
import {CartasState} from '../../store/reducers/cartas.reducer';
import {getCarta} from '../../store/selectors/cartas.selectors';

@Component({
	selector: 'app-carta',
	templateUrl: './carta.component.html',
	styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {

	carta$: Observable<Carta>;

	constructor(private store: Store<CartasState>, private db: AngularFirestore) {
	}

	ngOnInit() {
		this.carta$ = this.store.pipe(
			select(getCarta),
			tap(console.log),
		);
	}

	vai() {
		this.carta$.pipe(
			take(1),
		).subscribe(
			next => {
				const id = this.db.createId();
				this.db.collection('cartas').doc(id).set({...next, id}).catch();
			}
		);
	}
}
