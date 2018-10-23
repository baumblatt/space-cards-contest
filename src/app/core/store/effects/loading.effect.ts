import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {map, pluck, tap, withLatestFrom} from 'rxjs/operators';
import {AguardeComponent} from '../../components/aguarde/aguarde.component';
import {HIDE_LOADING, HideLoadingSuccess, SHOW_LOADING, ShowLoadingSuccess} from '../actions/loading.action';
import {LoadingState} from '../reducers/loading.reducer';
import {getLoadingDialogId} from '../selectors/loading.selectors';

@Injectable()
export class LoadingEffect {

	constructor(private actions$: Actions, public dialog: MatDialog, public store: Store<LoadingState>) {
	}

	@Effect()
	showLoading$ = this.actions$.pipe(
		ofType(SHOW_LOADING),
		pluck('payload'),
		map((config: MatDialogConfig<{ mensagem: string }>) => new ShowLoadingSuccess(this.dialog.open(AguardeComponent, {
			...config,
			closeOnNavigation: true,
			disableClose: true,
			width: '80vw',
		}).id)),
	);
	@Effect()
	hideLoading$ = this.actions$.pipe(
		ofType(HIDE_LOADING),
		pluck('payload'),
		withLatestFrom(this.store.pipe(select(getLoadingDialogId))),
		tap((dialogId: [any, string]) => {
			if (dialogId[1]) {
				this.dialog.getDialogById(dialogId[1]).close();
			}
		}),
		map(() => new HideLoadingSuccess()),
	);

}
