import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Carta} from '../../models/carta.model';

@Component({
	selector: 'app-carta-card',
	templateUrl: './carta-card.component.html',
	styleUrls: ['./carta-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartaCardComponent {

	@Input()
	carta: Carta;

}
