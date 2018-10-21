import {Action} from '@ngrx/store';
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
export const ENTRAR_SALA_SUCCESS = '[Sala] Entrar em uma sala de jogo (Success).';
export const ENTRAR_SALA_FAIL = '[Sala] Entrar em uma sala de jogo (Fail).';

export class EntrarSala implements Action {
	readonly type = ENTRAR_SALA;

	constructor(public payload?: string) {
	}
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

export const OBSERVAR_SALA_SUBSCRIBE = '[Sala] Observação de Sala (Subscribe).';
export const OBSERVAR_SALA_NEXT = '[Sala] Observação de Sala (Next).';
export const OBSERVAR_SALA_ERROR = '[Sala] Observação de Sala (Error).';
export const OBSERVAR_SALA_UNSUBSCRIBE = '[Sala] Observação de Sala (Unsubscribe).';

export class ObservarSalaSubscribe implements Action {
	readonly type = OBSERVAR_SALA_SUBSCRIBE;

	constructor(public payload: string) {
	}
}

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

export class ObservarSalaUnsubscribe implements Action {
	readonly type = OBSERVAR_SALA_UNSUBSCRIBE;
}

export type SalaAction =
	| CriarSala
	| CriarSalaSuccess
	| CriarSalaFail
	| EntrarSala
	| EntrarSalaSuccess
	| EntrarSalaFail
	| ObservarSalaSubscribe
	| ObservarSalaNext
	| ObservarSalaError
	| ObservarSalaUnsubscribe;
