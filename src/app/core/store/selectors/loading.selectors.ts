import {createSelector} from '@ngrx/store';
import {CoreState, getCoreState} from '../reducers/global.reducers';
import {LoadingState} from '../reducers/loading.reducer';


export const getLoadingState = createSelector(
	getCoreState,
	(state: CoreState) => state.loading
);

export const getLoadingDialogId = createSelector(
	getLoadingState,
	(state: LoadingState) => state.dialogId
);