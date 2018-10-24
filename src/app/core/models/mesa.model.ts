import {Carta} from './carta.model';

export interface Mesa {
	cartas: Carta[];
	criterio: string;
	rodada: number;
	jogador1: { score: number, carta: Carta };
	jogador2: { score: number, carta: Carta };
	jogador3?: { score: number, carta: Carta };
	jogador4?: { score: number, carta: Carta };
	vencedores: string[];
}