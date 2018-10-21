import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {cartasReducer, CartasState} from './cartas.reducer';
import {salaReducer, SalaState} from './sala.reducer';
import {usuarioReducer, UsuarioState} from './usuario-reducer';

export interface CoreState {
	usuario: UsuarioState;
	cartas: CartasState;
	sala: SalaState;
}

export const globalReducer: ActionReducerMap<CoreState> = {
	usuario: usuarioReducer,
	cartas: cartasReducer,
	sala: salaReducer,
};

export const getCoreState = createFeatureSelector<CoreState>(
	'core'
);
