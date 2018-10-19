import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {RouterStateUrl} from './router.reducer';

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export interface State {
	routerReducer: RouterReducerState<RouterStateUrl>;
}

export const globalReducer: ActionReducerMap<State> = {
	routerReducer: routerReducer,
};

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');
