import {Action} from '@ngrx/store';

export const CARTAS = '[Cartas] Recuperar cartas';
export const CARTAS_FAIL = '[Cartas]  Recuperar cartas(Fail)';

export class Cartas implements Action {
	readonly type = CARTAS;

	constructor(public payload: any) {
	}
}

export class CartasFail implements Action {
	readonly type = CARTAS_FAIL;

	constructor(public payload: any) {
	}
}


export type CartasAction =
	| Castas
	| CartasFail;
