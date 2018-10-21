import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/global.reducers';
import {getUsuario} from './usuario.selectors';

export const getSalaState = createSelector(
	getCoreState,
	state => state.sala
);

export const getSala = createSelector(
	getSalaState,
	state => state.sala
);

export const getSlot = createSelector(
	getUsuario,
	getSala,
	(usuario, sala) => {

		if (usuario && sala && sala.jogador1 && usuario.uid === sala.jogador1.uid) {
			return {sala: sala.id, jogador: 'jogador1'};
		}

		if (usuario && sala && sala.jogador2 && usuario.uid === sala.jogador2.uid) {
			return {sala: sala.id, jogador: 'jogador2'};
		}

		if (usuario && sala && sala.jogador3 && usuario.uid === sala.jogador3.uid) {
			return {sala: sala.id, jogador: 'jogador3'};
		}

		if (usuario && sala && sala.jogador4 && usuario.uid === sala.jogador4.uid) {
			return {sala: sala.id, jogador: 'jogador4'};
		}

		return undefined;
	}
);
