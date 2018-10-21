import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/global.reducers';

export const getBaralhoState = createSelector(
	getCoreState,
	state => state.baralho
);

export const getMao = createSelector(
	getBaralhoState,
	state => state.mao
);

export const getCriterio = createSelector(
	getBaralhoState,
	state => state.mesa && state.mesa.criterio ? state.mesa.criterio.nome : undefined
);
