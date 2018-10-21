import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, Effect} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Mao} from '../../models/mao.model';
import {ObservarMaoError, ObservarMaoNext} from '../actions/baralho.action';
import {CoreState} from '../reducers/global.reducers';
import {getSlot} from '../selectors/sala.selectors';

@Injectable()
export class BaralhoEffects {

	constructor(private actions$: Actions, private db: AngularFirestore, private store: Store<CoreState>) {
	}

	@Effect()
	mao = this.store.pipe(select(getSlot)).pipe(
		tap(console.log),
		switchMap(slot => {
			if (!slot) {
				return EMPTY;
			}

			return this.db.collection(`salas/${slot.sala}/${slot.jogador}`,
				ref => ref.orderBy('rodada', 'desc').limit(1)).valueChanges().pipe(
				mergeMap(documents => documents),
				map((document: Mao) => new ObservarMaoNext(document)),
				catchError((err) => of(new ObservarMaoError(err))),
			);
		})
	);
}
