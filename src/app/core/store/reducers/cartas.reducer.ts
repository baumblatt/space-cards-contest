import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Carta} from '../../models/cards.model';
import {CARTAS, CartasAction} from '../actions/cartas.action';

export const cartasAdapter: EntityAdapter<Carta> = createEntityAdapter<Carta>({
	selectId: (a) => a.id,
	sortComparer: (a, b) => a.name < b.name ? -1 : 1,
});

export interface CartasState extends EntityState<Carta> {

}

export const initialState: CartasState = cartasAdapter.getInitialState({});

export function cartasReducer(state = initialState, action: CartasAction): CartasState {

	switch (action.type) {

		case CARTAS: {
			return cartasAdapter.addMany(action.payload, state);
		}


		default: {
			return state;
		}
	}
}
