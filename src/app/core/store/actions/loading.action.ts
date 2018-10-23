import {MatDialogConfig} from '@angular/material';
import {Action} from '@ngrx/store';

/**
 * Configuração do Dialogo de Aguarde.
 */
export const POR_FAVOR_AGUARDE: MatDialogConfig<{ mensagem: string }> = {data: {mensagem: 'Por favor, aguarde ..'}};


export const SHOW_LOADING = '[Loading] Apresentar Loading';
export const SHOW_LOADING_SUCCESS = '[Loading] Apresentar Loading (Success)';

export const HIDE_LOADING = '[Loading] Fechar Loading';
export const HIDE_LOADING_SUCCESS = '[Loading] Fechar Loading (Success)';

export class ShowLoading implements Action {
	readonly type = SHOW_LOADING;

	constructor(public payload: MatDialogConfig<{ mensagem: string }>) {
	}
}

export class ShowLoadingSuccess implements Action {
	readonly type = SHOW_LOADING_SUCCESS;

	constructor(public payload: string) {
	}
}

export class HideLoading implements Action {
	readonly type = HIDE_LOADING;
}

export class HideLoadingSuccess implements Action {
	readonly type = HIDE_LOADING_SUCCESS;
}

export type LoadingAction = | ShowLoading | ShowLoadingSuccess | HideLoading | HideLoadingSuccess;


