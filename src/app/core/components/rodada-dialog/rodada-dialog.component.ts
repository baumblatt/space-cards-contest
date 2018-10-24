import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Mesa} from '../../models/mesa.model';

@Component({
	selector: 'app-rodada-dialog',
	templateUrl: './rodada-dialog.component.html',
	styleUrls: ['./rodada-dialog.component.scss']
})
export class RodadaDialogComponent {

	constructor(public dialogRef: MatDialogRef<RodadaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Mesa) {
	}

	fechar() {
		this.dialogRef.close();
	}
}
