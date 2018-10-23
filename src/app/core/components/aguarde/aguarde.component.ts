import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'app-aguarde',
	templateUrl: './aguarde.component.html',
	styleUrls: ['./aguarde.component.scss']
})
export class AguardeComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
	}
}
