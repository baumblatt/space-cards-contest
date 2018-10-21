import {Carta} from './carta.model';

export interface Mao {
	cartas: Carta[];
	rodada: number;
	mestre: boolean;
}
