import {Action} from '@ngrx/store';
import {Usuario} from '../../models/usuario.model';

export const ATUALIZAR_USUARIO = '[Usuário] Atualização do usuário.';

export class AtualizarUsuario implements Action {
	readonly type = ATUALIZAR_USUARIO;

	constructor(public payload: Usuario) {
	}
}

export const ENTRAR = '[Usuário] Entrar no aplicativo.';
export const ENTRAR_SUCCESS = '[Usuário] Entrar no aplicativo (Success).';
export const ENTRAR_FAIL = '[Usuário] Entrar no aplicativo (Fail).';

export class Entrar implements Action {
	readonly type = ENTRAR;

	constructor(public payload: string) {
	}
}

export class EntrarSuccess implements Action {
	readonly type = ENTRAR_SUCCESS;

	constructor(public payload: Usuario) {
	}
}

export class EntrarFail implements Action {
	readonly type = ENTRAR_FAIL;

	constructor(public payload: any) {
	}
}

export const SAIR = '[Usuário] Sair do aplicativo.';
export const SAIR_SUCCESS = '[Usuário] Sair do aplicativo (Success).';
export const SAIR_FAIL = '[Usuário] Sair do aplicativo (Fail).';

export class Sair implements Action {
	readonly type = SAIR;
}

export class SairSuccess implements Action {
	readonly type = SAIR_SUCCESS;
}

export class SairFail implements Action {
	readonly type = SAIR_FAIL;

	constructor(public payload: any) {
	}
}

export type UsuarioAction =
	| AtualizarUsuario
	| Entrar
	| EntrarSuccess
	| EntrarFail
	| Sair
	| SairSuccess
	| SairFail;
