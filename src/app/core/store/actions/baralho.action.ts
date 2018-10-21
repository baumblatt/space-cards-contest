import {Action} from '@ngrx/store';

export const OBSERVAR_MAO_NEXT = '[Baralho] Observação de Mao (Next).';
export const OBSERVAR_MAO_ERROR = '[Baralho] Observação de Mao (Error).';

export class ObservarMaoNext implements Action {
	readonly type = OBSERVAR_MAO_NEXT;

	constructor(public payload: any) {
	}
}

export class ObservarMaoError implements Action {
	readonly type = OBSERVAR_MAO_ERROR;

	constructor(public payload: any) {
	}
}

export type BaralhoAction =
	| ObservarMaoNext
	| ObservarMaoError;
