import {createSelector} from '@ngrx/store';
import {cartasAdapter} from '../reducers/cartas.reducer';
import {getCoreState} from '../reducers/global.reducers';

export const getCartasState = createSelector(
	getCoreState,
	state => state.cartas
);

export const getCartas = createSelector(
	getCartasState,
	state => cartasAdapter.getSelectors().selectAll(state).filter(carta => !!carta.thumbnail)
);

export const getCarta = createSelector(
	getCartasState,
	state => state.entities[state.selecionada]
);
