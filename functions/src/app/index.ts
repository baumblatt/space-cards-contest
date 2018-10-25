import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {HttpsError} from 'firebase-functions/lib/providers/https';
import * as _ from 'lodash';

export const appCreateProfile = functions.auth.user()
	.onCreate((user) => {
		const {uid, displayName, photoURL, phoneNumber, email} = user;

		return admin.firestore().doc(`/usuarios/${uid}`).set({
			uid, displayName, photoURL, phoneNumber, email
		}, {merge: true});
	});

export const entrarSala = functions.https.onCall(async (data, context) => {
	if (!context.auth && data.jogador.uid === context.auth.uid) {
		return new HttpsError('failed-precondition', 'Usuário não autenticado.', 'O usuário deve estar autenticado.');
	}

	const queryRef = admin.firestore().collection('salas')
		.where("codigoAcesso", "==", data.codigoAcesso)
		.where('iniciado', '==', false)
		.limit(1);

	// Get collection snapshot
	const snapshot = await queryRef.get();

	// Map through snapshot's docs
	let sala: any = snapshot.docs.map(doc => ({...doc.data()})).pop();

	if (sala) {
		let joined = false;

		if (!sala.jogador2) {
			sala = {...sala, jogador2: data.jogador};
			joined = true;
		} else if (!sala.jogador3) {
			sala = {...sala, jogador3: data.jogador};
			joined = true;
		} else if (!sala.jogador4) {
			sala = {...sala, jogador4: data.jogador};
			joined = true;
		}

		if (joined) {
			await admin.firestore().doc(`salas/${sala.id}`).set(sala, {merge: true});
			return sala;
		}
	}

	return new HttpsError('unavailable', 'A sala não existe ou o jogo já foi iniciado.', 'A sala não existe ou o jogo já foi iniciado.');
});

export const iniciarJogo = functions.https.onCall(async (data, context) => {
	// if (!context.auth && data.jogador1.uid === context.auth.uid) {
	// 	return new HttpsError('failed-precondition', 'Usuário não autenticado.', 'O usuário deve estar autenticado.');
	// }

	const cartasSnapshot = await admin.firestore().collection('cartas').get();
	let cartas: any[] = cartasSnapshot.docs.map(doc => ({...doc.data()}));

	cartas = _.shuffle(cartas);

	const mesa = {
		cartas: cartas,
		rodada: 0,
		jogador1: {nome: data.jogador1.displayName, score: 0},
		jogador2: {nome: data.jogador2.displayName, score: 0},
		jogador3: {nome: data.jogador3 ? data.jogador3.displayName : '', score: 0},
		jogador4: {nome: data.jogador4 ? data.jogador4.displayName : '', score: 0},
	};

	const tamanho = 5;

	const jogador1 = {cartas: [], rodada: 1, mestre: true};
	for (let i = 0; i < tamanho; i++) jogador1.cartas.push(cartas.pop());

	await admin.firestore().doc(`salas/${data.id}/jogador1/mao-0`).set(jogador1, {merge: true});

	const jogador2 = {cartas: [], rodada: 1, mestre: false};
	for (let i = 0; i < tamanho; i++) {
		jogador2.cartas.push(cartas.pop());
	}

	await admin.firestore().doc(`salas/${data.id}/jogador2/mao-0`).set(jogador2, {merge: true});

	if (data.jogador3) {
		const jogador3 = {cartas: [], rodada: 1, mestre: false};
		for (let i = 0; i < tamanho; i++) {
			jogador3.cartas.push(cartas.pop());
		}

		await admin.firestore().doc(`salas/${data.id}/jogador3/mao-0`).set(jogador3, {merge: true});
	}

	if (data.jogador4) {
		const jogador4 = {cartas: [], rodada: 1, mestre: false};
		for (let i = 0; i < tamanho; i++) {
			jogador4.cartas.push(cartas.pop());
		}

		await admin.firestore().doc(`salas/${data.id}/jogador4/mao-0`).set(jogador4, {merge: true});
	}

	await admin.firestore().doc(`salas/${data.id}/mesa/mesa-0`).set(mesa, {merge: true});

	const sala = {...data, iniciado: true};
	await admin.firestore().doc(`salas/${data.id}`).set(sala, {merge: true});

	return sala;
});

export const enviarCriterio = functions.https.onCall(async (data, context) => {
	const sala = data.sala;

	const mesaSnapshot = await admin.firestore().collection(`salas/${sala.id}/mesa`)
		.orderBy('rodada', 'desc').limit(1).get();
	const mesas = mesaSnapshot.docs.map(doc => ({...doc.data()}));

	const [mesaAnterior] = mesas;
	const mesa: any = {
		cartas: mesaAnterior.cartas,
		criterio: data.criterio,
		rodada: mesaAnterior.rodada + 1,
		vencedores: [],
	};

	//----------
	// JOGADOR 1
	//----------

	const jogador1Snapshot = await admin.firestore().collection(`salas/${sala.id}/jogador1`)
		.orderBy('rodada', 'desc').limit(1).get();
	const maos1 = jogador1Snapshot.docs.map(doc => ({...doc.data()}));

	const [mao1] = maos1;
	const [carta1, ...cartas1] = mao1.cartas;

	mesa.jogador1 = {score: mesaAnterior.jogador1.score, carta: carta1};
	mao1.cartas = cartas1;
	mao1.mestre = true;

	mesa.vencedores.push('jogador1');

	//----------
	// JOGADOR 2
	//----------

	const jogador2Snapshot = await admin.firestore().collection(`salas/${sala.id}/jogador2`)
		.orderBy('rodada', 'desc').limit(1).get();
	const maos2 = jogador2Snapshot.docs.map(doc => ({...doc.data()}));

	const [mao2] = maos2;
	const [carta2, ...cartas2] = mao2.cartas;

	mesa.jogador2 = {score: mesaAnterior.jogador2.score, carta: carta2};
	mao2.cartas = cartas2;

	if (mesa.jogador2.carta[mesa.criterio].value > mesa[mesa.vencedores[0]].carta[mesa.criterio].value) {
		mesa.vencedores = ['jogador2'];
		mao1.mestre = false;
		mao2.mestre = true;
	} else if (mesa.jogador2.carta[mesa.criterio].value === mesa[mesa.vencedores[0]].carta[mesa.criterio].value) {
		mesa.vencedores.push('jogador2');
	}

	//----------
	// JOGADOR 3
	//----------

	let mao3 = undefined;
	if (sala.jogador3) {
		const jogador3Snapshot = await admin.firestore().collection(`salas/${sala.id}/jogador3`)
			.orderBy('rodada', 'desc').limit(1).get();
		const maos3 = jogador3Snapshot.docs.map(doc => ({...doc.data()}));

		const [mao] = maos3;
		mao3 = mao;
		const [carta3, ...cartas3] = mao3.cartas;

		mesa.jogador3 = {score: mesaAnterior.jogador3.score, carta: carta3};
		mao3.cartas = cartas3;

		if (mesa.jogador3.carta[mesa.criterio].value > mesa[mesa.vencedores[0]].carta[mesa.criterio].value) {
			mesa.vencedores = ['jogador3'];
			mao1.mestre = false;
			mao2.mestre = false;
			mao3.mestre = true;
		} else if (mesa.jogador3.carta[mesa.criterio].value === mesa[mesa.vencedores[0]].carta[mesa.criterio].value) {
			mesa.vencedores.push('jogador3');
		}
	}

	//----------
	// JOGADOR 4
	//----------

	let mao4 = undefined;
	if (sala.jogador4) {
		const jogador4Snapshot = await admin.firestore().collection(`salas/${sala.id}/jogador4`)
			.orderBy('rodada', 'desc').limit(1).get();
		const maos4 = jogador4Snapshot.docs.map(doc => ({...doc.data()}));

		const [mao] = maos4;
		mao4 = mao;
		const [carta4, ...cartas4] = mao4.cartas;

		mesa.jogador4 = {score: mesaAnterior.jogador4.score, carta: carta4};
		mao4.cartas = cartas4;

		if (mesa.jogador4.carta[mesa.criterio].value > mesa[mesa.vencedores[0]].carta[mesa.criterio].value) {
			mesa.vencedores = ['jogador4'];
			mao1.mestre = false;
			mao2.mestre = false;
			mao3.mestre = false;
			mao4.mestre = true;
		} else if (mesa.jogador4.carta[mesa.criterio].value === mesa[mesa.vencedores[0]].carta[mesa.criterio].value) {
			mesa.vencedores.push('jogador4');
		}
	}

	mesa.vencedores.forEach(vencedor => mesa[vencedor].score = mesa[vencedor].score + 1);

	//-----------------
	// GRAVAR RESULTADO
	//-----------------

	await admin.firestore().doc(`salas/${sala.id}/mesa/mesa-${mesa.rodada}`).set(mesa, {merge: true});

	await admin.firestore().doc(`salas/${sala.id}/jogador1/mao-${mesa.rodada}`).set(mao1, {merge: true});
	await admin.firestore().doc(`salas/${sala.id}/jogador2/mao-${mesa.rodada}`).set(mao2, {merge: true});
	if (sala.jogador3) {
		await admin.firestore().doc(`salas/${sala.id}/jogador3/mao-${mesa.rodada}`).set(mao3, {merge: true});
	}
	if (sala.jogador4) {
		await admin.firestore().doc(`salas/${sala.id}/jogador4/mao-${mesa.rodada}`).set(mao4, {merge: true});
	}

	return mesa;
});
