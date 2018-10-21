import {Carta} from '../../models/carta.model';
import {BaralhoAction, ESCOLHER_CRITERIO, OBSERVAR_MAO_NEXT} from '../actions/baralho.action';

export interface BaralhoState {
	mao?: {
		cartas: Carta[];
		rodada: number;
		mestre: boolean;
	};
	mesa?: {
		jogador1?: Carta;
		jogador2?: Carta;
		jogador3?: Carta;
		jogador4?: Carta;
		criterio: {
			nome: string;
		};
	};
}

export const initialState: BaralhoState = {};

export function baralhoReducer(state = initialState, action: BaralhoAction): BaralhoState {

	switch (action.type) {

		case OBSERVAR_MAO_NEXT: {
			return {
				...state,
				mao: action.payload
			};
		}

		case ESCOLHER_CRITERIO: {
			const criterio = {nome: action.payload};
			return {
				...state,
				mesa: state.mesa ? {...state.mesa, criterio} : {criterio}
			};
		}

		default: {
			return state;
		}
	}
}
