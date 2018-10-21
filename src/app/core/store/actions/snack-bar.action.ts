import {Action} from '@ngrx/store';
import {Mensagem} from '../../models/mensagem.model';

export const SHOW_SNACK_BAR = '[Snack Bar] Apresentar mensagem';

export class ShowSnackBar implements Action {
	readonly type = SHOW_SNACK_BAR;

	constructor(public payload: Mensagem) {

	}
}

export type SnackBarAction = | ShowSnackBar;
