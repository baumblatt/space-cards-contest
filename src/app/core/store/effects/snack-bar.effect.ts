import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {SHOW_SNACK_BAR, ShowSnackBar} from '../actions/snack-bar.action';


@Injectable()
export class SnackBarEffect {


	constructor(private actions$: Actions, private snackBar: MatSnackBar) {

	}

	@Effect({dispatch: false})
	showShackBar = this.actions$.pipe(
		ofType(SHOW_SNACK_BAR),
		tap((action: ShowSnackBar) => this.snackBar.open(action.payload.mensagem, undefined, action.payload.config)),
		map(() => of({})),
	);

}
