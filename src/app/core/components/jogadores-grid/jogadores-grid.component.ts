import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Mesa} from '../../models/mesa.model';
import {Usuario} from '../../models/usuario.model';

@Component({
	selector: 'app-jogadores-grid',
	templateUrl: './jogadores-grid.component.html',
	styleUrls: ['./jogadores-grid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class JogadoresGridComponent {

	@Input()
	cols: number;

	@Input()
	mesa: Mesa;

	@Input()
	jogador1: Usuario;

	@Input()
	jogador2: Usuario;

	@Input()
	jogador3: Usuario;

	@Input()
	jogador4: Usuario;

}
