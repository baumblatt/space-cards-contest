export interface Carta {
	id: string;
	name: string;
	code: string;
	description: string;
	category: string;
	images: string[];
	distance: {
		display: string;
		value: string;
	};
}
