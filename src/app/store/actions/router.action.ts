import {Action} from '@ngrx/store';

export const NAVIGATION = 'ROUTER_NAVIGATION';

export class Navigation implements Action {
	readonly type = NAVIGATION;

	constructor(public payload: any) {
	}
}
