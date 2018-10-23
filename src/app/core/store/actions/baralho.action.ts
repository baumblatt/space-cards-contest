import {Action} from '@ngrx/store';
import {Mesa} from '../../models/mesa.model';

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

export const ENVIAR_CRITERIO = '[Baralho] Enviar critério de Contest.';
export const ENVIAR_CRITERIO_SUCCESS = '[Baralho] Enviar critério de Contest (Success).';
export const ENVIAR_CRITERIO_FAIL = '[Baralho] Enviar critério de Contest (Fail).';

export class EnviarCriterio implements Action {
	readonly type = ENVIAR_CRITERIO;
}

export class EnviarCriterioSuccess implements Action {
	readonly type = ENVIAR_CRITERIO_SUCCESS;

	constructor(public payload: any) {
	}
}

export class EnviarCriterioFail implements Action {
	readonly type = ENVIAR_CRITERIO_FAIL;

	constructor(public payload: any) {
	}
}

export const OBSERVAR_MESA_NEXT = '[Baralho] Observação de Mesa (Next).';
export const OBSERVAR_MESA_ERROR = '[Baralho] Observação de Mesa (Error).';

export class ObservarMesaNext implements Action {
	readonly type = OBSERVAR_MESA_NEXT;

	constructor(public payload: Mesa) {
	}
}

export class ObservarMesaError implements Action {
	readonly type = OBSERVAR_MESA_ERROR;

	constructor(public payload: any) {
	}
}

export type BaralhoAction =
	| EscolherCriterio
	| EnviarCriterio
	| EnviarCriterioSuccess
	| EnviarCriterioFail
	| ObservarMaoNext
	| ObservarMaoError
	| ObservarMesaNext
	| ObservarMesaError;
