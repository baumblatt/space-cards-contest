import {Action} from '@ngrx/store';

export const ESCOLHER_CRITERIO = '[Baralho] Escolher critério';
export const OBSERVAR_MAO_NEXT = '[Baralho] Observação de Mao (Next).';
export const OBSERVAR_MAO_ERROR = '[Baralho] Observação de Mao (Error).';

export class EscolherCriterio implements Action {
	readonly type = ESCOLHER_CRITERIO;

	constructor(public payload: string) {
	}
}

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
	| EscolherCriterio
	| ObservarMaoNext
	| ObservarMaoError;
