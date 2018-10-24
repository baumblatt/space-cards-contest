import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/global.reducers';
import {getSala} from './sala.selectors';

export const getBaralhoState = createSelector(
	getCoreState,
	state => state.baralho
);

export const getMao = createSelector(
	getBaralhoState,
	state => state.mao
);

export const getMesa = createSelector(
	getBaralhoState,
	state => state.mesa
);

export const getProximoCriterio = createSelector(
	getBaralhoState,
	state => state.proximoCriterio
);

export const getVencedores = createSelector(
	getSala,
	getMesa,
	(sala, mesa) => {

		// Caso base, sala ou mesa não inicializada.
		if (!sala || !mesa) {
			return [];
		}

		let vencedores = ['jogador1'];

		if (mesa.jogador2 && mesa.jogador2.score > mesa[vencedores[0]].score) {
			vencedores = ['jogador2'];
		} else if (mesa.jogador2 && mesa.jogador2.score === mesa[vencedores[0]].score) {
			vencedores.push('jogador2');
		}

		if (mesa.jogador3 && mesa.jogador3.score > mesa[vencedores[0]].score) {
			vencedores = ['jogador3'];
		} else if (mesa.jogador3 && mesa.jogador3.score === mesa[vencedores[0]].score) {
			vencedores.push('jogador3');
		}

		if (mesa.jogador4 && mesa.jogador4.score > mesa[vencedores[0]].score) {
			vencedores = ['jogador4'];
		} else if (mesa.jogador4 && mesa.jogador4.score === mesa[vencedores[0]].score) {
			vencedores.push('jogador4');
		}

		return vencedores.map(vencedor => sala[vencedor]);
	}
);
