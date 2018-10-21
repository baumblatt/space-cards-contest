import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/global.reducers';

export const getSalaState = createSelector(
	getCoreState,
	state => state.sala
);

export const getSala = createSelector(
	getSalaState,
	state => state.sala
);
