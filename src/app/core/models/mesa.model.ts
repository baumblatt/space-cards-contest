import {Carta} from './carta.model';

export interface Mesa {
	cartas: Carta[];
	criterio: string;
	rodada: number;
	jogador1: { nome: string, score: number, carta: Carta };
	jogador2: { nome: string, score: number, carta: Carta };
	jogador3?: { nome: string, score: number, carta: Carta };
	jogador4?: { nome: string, score: number, carta: Carta };
	vencedores: string[];
}