import {Carta} from '../../models/carta.model';
import {Mesa} from '../../models/mesa.model';
import {BaralhoAction, ESCOLHER_CRITERIO, OBSERVAR_MAO_NEXT, OBSERVAR_MESA_NEXT} from '../actions/baralho.action';

export interface BaralhoState {
	mao?: {
		cartas: Carta[];
		rodada: number;
		mestre: boolean;
	};
	proximoCriterio?: string;
	mesa?: Mesa;
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

		case OBSERVAR_MESA_NEXT: {
			return {
				...state,
				mesa: action.payload
			};
		}

		default: {
			return state;
		}
	}
}
