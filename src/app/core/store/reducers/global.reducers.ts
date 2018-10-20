import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {cartasReducer, CartasState} from './cartas.reducer';
import {usuarioReducer, UsuarioState} from './usuario-reducer';

export interface CoreState {
	usuario: UsuarioState;
	cartas: CartasState;
}

export const globalReducer: ActionReducerMap<CoreState> = {
	usuario: usuarioReducer,
	cartas: cartasReducer,
};

export const getCoreState = createFeatureSelector<CoreState>(
	'core'
);
