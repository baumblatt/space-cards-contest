import {Carta} from '../../models/carta.model';
import {BaralhoAction, ESCOLHER_CRITERIO, OBSERVAR_MAO_NEXT} from '../actions/baralho.action';

export interface BaralhoState {
	mao?: {
		cartas: Carta[];
		rodada: number;
		mestre: boolean;
	};
	proximoCriterio?: string;
	mesa?: {
		jogador1?: Carta;
		jogador2?: Carta;
		jogador3?: Carta;
		jogador4?: Carta;
		criterio: string;
	};
}

export const initialState: BaralhoState = {};

export function baralhoReducer(state = initialState, action: BaralhoAction): BaralhoState {

	switch (action.type) {

		case OBSERVAR_MAO_NEXT: {
			const {proximoCriterio, ...rest} = state;

			return {
				...rest,
				mao: action.payload
			};
		}

		case ESCOLHER_CRITERIO: {
			return {
				...state,
				proximoCriterio: action.payload
			};
		}

		default: {
			return state;
		}
	}
}
