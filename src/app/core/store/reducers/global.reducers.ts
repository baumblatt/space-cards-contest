import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {usuarioReducer, UsuarioState} from './usuario-reducer';

export interface CoreState {
	usuario: UsuarioState;
}

export const globalReducer: ActionReducerMap<CoreState> = {
	usuario: usuarioReducer,
};

export const getCoreState = createFeatureSelector<CoreState>(
	'core'
);
