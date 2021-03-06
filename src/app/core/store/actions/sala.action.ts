import {Action} from '@ngrx/store';
import {Navigation} from '../../../store/actions/router.action';
import {Sala} from '../../models/sala.model';

export const CRIAR_SALA = '[Sala] Criar sala de jogo.';
export const CRIAR_SALA_SUCCESS = '[Sala] Criar sala de jogo (Success).';
export const CRIAR_SALA_FAIL = '[Sala] Criar sala de jogo (Fail).';

export class CriarSala implements Action {
	readonly type = CRIAR_SALA;
}

export class CriarSalaSuccess implements Action {
	readonly type = CRIAR_SALA_SUCCESS;

	constructor(public payload: Sala) {
	}
}

export class CriarSalaFail implements Action {
	readonly type = CRIAR_SALA_FAIL;

	constructor(public payload: any) {
	}
}

export const ENTRAR_SALA = '[Sala] Entrar em uma sala de jogo.';
export const ENTRAR_SALA_DIALOG = '[Sala] Entrar em uma sala de jogo. (Dialog)';
export const ENTRAR_SALA_SUCCESS = '[Sala] Entrar em uma sala de jogo (Success).';
export const ENTRAR_SALA_FAIL = '[Sala] Entrar em uma sala de jogo (Fail).';

export class EntrarSala implements Action {
	readonly type = ENTRAR_SALA;
}

export class EntrarSalaDialog implements Action {
	readonly type = ENTRAR_SALA_DIALOG;
}

export class EntrarSalaSuccess implements Action {
	readonly type = ENTRAR_SALA_SUCCESS;

	constructor(public payload: Sala) {
	}
}

export class EntrarSalaFail implements Action {
	readonly type = ENTRAR_SALA_FAIL;

	constructor(public payload: any) {
	}
}

export const OBSERVAR_SALA_NEXT = '[Sala] Observação de Sala (Next).';
export const OBSERVAR_SALA_ERROR = '[Sala] Observação de Sala (Error).';

export class ObservarSalaNext implements Action {
	readonly type = OBSERVAR_SALA_NEXT;

	constructor(public payload: Sala) {
	}
}

export class ObservarSalaError implements Action {
	readonly type = OBSERVAR_SALA_ERROR;

	constructor(public payload: any) {
	}
}

export const INICIAR_JOGO = '[Sala] Iniciar jogo.';
export const INICIAR_JOGO_SUCCESS = '[Sala] Iniciar jogo (Success).';
export const INICIAR_JOGO_FAIL = '[Sala] Iniciar jogo (Fail).';

export class IniciarJogo implements Action {
	readonly type = INICIAR_JOGO;

	constructor(public payload: Sala) {
	}
}

export class IniciarJogoSuccess implements Action {
	readonly type = INICIAR_JOGO_SUCCESS;

	constructor(public payload: Sala) {
	}
}

export class IniciarJogoFail implements Action {
	readonly type = INICIAR_JOGO_FAIL;

	constructor(public payload: any) {
	}
}

export type SalaAction =
	| CriarSala
	| CriarSalaSuccess
	| CriarSalaFail
	| EntrarSala
	| EntrarSalaDialog
	| EntrarSalaSuccess
	| EntrarSalaFail
	| ObservarSalaNext
	| ObservarSalaError
	| IniciarJogo
	| IniciarJogoSuccess
	| IniciarJogoFail
	| Navigation;
