import {Sala} from '../../models/sala.model';
import {CRIAR_SALA_SUCCESS, ENTRAR_SALA_SUCCESS, OBSERVAR_SALA_NEXT, SalaAction} from '../actions/sala.action';

export interface SalaState {
	sala?: Sala;
}

export const initialState: SalaState = {};

export function salaReducer(state = initialState, action: SalaAction): SalaState {

	switch (action.type) {

		case CRIAR_SALA_SUCCESS:
		case OBSERVAR_SALA_NEXT:
		case ENTRAR_SALA_SUCCESS: {
			return {
				...state,
				sala: action.payload
			};
		}


		default: {
			return state;
		}
	}
}
