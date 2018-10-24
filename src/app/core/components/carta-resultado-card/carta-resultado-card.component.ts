import {Component, Input} from '@angular/core';
import {Carta} from '../../models/carta.model';

@Component({
	selector: 'app-carta-resultado-card',
	templateUrl: './carta-resultado-card.component.html',
	styleUrls: ['./carta-resultado-card.component.scss']
})
export class CartaResultadoCardComponent {

	@Input()
	criterio: string;

	@Input()
	carta: Carta;

	@Input()
	slot: boolean;

}
