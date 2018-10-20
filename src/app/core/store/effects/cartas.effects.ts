import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cartas, CartasFail} from '../actions/cartas.action';

@Injectable()
export class CartasEffects {

	constructor(private actions$: Actions, private db: AngularFirestore) {
	}

	@Effect()
	cartas = this.db.collection('cartas').valueChanges().pipe(
		map(cartas => new Cartas(cartas)),
		catchError(error => of(new CartasFail(error)))
	);
}
