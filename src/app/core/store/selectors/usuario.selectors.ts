import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/global.reducers';

export const getUsuarioState = createSelector(
	getCoreState,
	state => state.usuario
);

export const getUsuario = createSelector(
	getUsuarioState,
	state => state.usuario
);

export const isUsuarioAutenticado = createSelector(
	getUsuario,
	usuario => !usuario ? undefined : !!usuario.uid
);
