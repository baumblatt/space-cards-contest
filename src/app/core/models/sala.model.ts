import {Usuario} from './usuario.model';

export interface Sala {
	id: string;
	codigoAcesso: string;
	jogador1?: Usuario;
	jogador2?: Usuario;
	jogador3?: Usuario;
	jogador4?: Usuario;
	iniciado?: boolean;
}
