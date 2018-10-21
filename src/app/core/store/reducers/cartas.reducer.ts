import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Carta} from '../../models/carta.model';
import {CARTAS, CartasAction} from '../actions/cartas.action';

export const cartasAdapter: EntityAdapter<Carta> = createEntityAdapter<Carta>({
	selectId: (a) => a.id,
	sortComparer: (a, b) => (a.name || a.code) < (b.name || b.code) ? -1 : 1,
});

export interface CartasState extends EntityState<Carta> {
	selecionada?: string;
}

export const initialState: CartasState = cartasAdapter.getInitialState({});

export function cartasReducer(state = initialState, action: CartasAction): CartasState {

	switch (action.type) {

		case 'ROUTER_NAVIGATION': {
			const {url, params} = action.payload.event.state;

			return {
				...state,
				selecionada: url.startsWith('/core/game/carta') ? params.id : ''
			};
		}

		case CARTAS: {
			return cartasAdapter.upsertMany(action.payload, state);
		}


		default: {
			return state;
		}
	}
}
