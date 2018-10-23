import {HIDE_LOADING_SUCCESS, LoadingAction, SHOW_LOADING_SUCCESS} from '../actions/loading.action';

export interface LoadingState {
	dialogId?: string
}

export const initialState: LoadingState = {};

export function loadingReducer(state = initialState, action: LoadingAction): LoadingState {

	switch (action.type) {
		case SHOW_LOADING_SUCCESS: {
			const dialogId = action.payload;

			return {
				...state,
				dialogId
			};
		}

		case HIDE_LOADING_SUCCESS: {
			// ecma6 - object destruction - basic assignment
			const {dialogId: removed, ...newState} = state;

			return {
				...newState,
			};
		}


		default: {
			return state;
		}
	}
}
