export interface Carta {
	id: string;
	name: string;
	code: string;
	description: string;
	category: string;
	images: string[];
	thumbnail: string;
	distance: {
		display: string;
		value: string;
	};
	magnitude: {
		display: string;
		value: string;
	};
	majaxis: {
		display: string;
		value: string;
	};
	minaxis: {
		display: string;
		value: string;
	};
	velocity: {
		display: string;
		value: string;
	};
}
