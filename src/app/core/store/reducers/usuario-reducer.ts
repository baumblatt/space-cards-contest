import {Usuario} from '../../models/usuario.model';
import {ATUALIZAR_USUARIO, ENTRAR_SUCCESS, UsuarioAction} from '../actions/usuario.action';

export interface UsuarioState {
	usuario?: Usuario;
}

export const initialState: UsuarioState = {
	usuario: undefined,
};

export function usuarioReducer(state = initialState, action: UsuarioAction): UsuarioState {

	switch (action.type) {

		case ATUALIZAR_USUARIO:
		case ENTRAR_SUCCESS: {
			return {
				...state,
				usuario: action.payload
			};
		}

		default: {
			return state;
		}
	}
}
