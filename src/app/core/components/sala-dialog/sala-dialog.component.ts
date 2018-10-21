import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-sala-dialog',
	templateUrl: './sala-dialog.component.html',
	styleUrls: ['./sala-dialog.component.scss']
})
export class SalaDialogComponent {

	salaForm = this.fb.group({
		codigoAcesso: [null, Validators.required],
	});

	constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SalaDialogComponent>) {
	}

	entrar() {
		if (this.salaForm.valid && this.salaForm.get('codigoAcesso').value.length === 4) {
			this.dialogRef.close(this.salaForm.get('codigoAcesso').value);
		}
	}

	cancelar() {
		this.dialogRef.close();
	}

}
