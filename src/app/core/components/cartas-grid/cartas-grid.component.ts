import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Carta} from '../../models/carta.model';

@Component({
	selector: 'app-cartas-grid',
	templateUrl: './cartas-grid.component.html',
	styleUrls: ['./cartas-grid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartasGridComponent {

	@Input()
	cartas: Carta[];
}
