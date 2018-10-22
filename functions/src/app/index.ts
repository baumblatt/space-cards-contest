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
	if (!context.auth && data.jogador1.uid === context.auth.uid) {
		return new HttpsError('failed-precondition', 'Usuário não autenticado.', 'O usuário deve estar autenticado.');
	}

	const cartasSnapshot = await admin.firestore().collection('cartas').get();
	let cartas: any[] = cartasSnapshot.docs.map(doc => ({...doc.data()}));

	cartas = _.shuffle(cartas);

	const tamanho = 3;

	let jogador1 = {cartas: [], rodada: 1, mestre: true};
	for (let i = 0; i < tamanho; i++) {
		jogador1.cartas.push(cartas.pop());
	}

	await admin.firestore().doc(`salas/${data.id}/jogador1/1`).set(jogador1, {merge: true});

	const jogador2 = {cartas: [], rodada: 1, mestre: false};
	for (let i = 0; i < tamanho; i++) {
		jogador2.cartas.push(cartas.pop());
	}

	await admin.firestore().doc(`salas/${data.id}/jogador2/1`).set(jogador2, {merge: true});

	if (data.jogador3) {
		const jogador3 = {cartas: [], rodada: 1, mestre: false};
		for (let i = 0; i < tamanho; i++) {
			jogador3.cartas.push(cartas.pop());
		}

		await admin.firestore().doc(`salas/${data.id}/jogador3/1`).set(jogador3, {merge: true});
	}

	if (data.jogador4) {
		const jogador4 = {cartas: [], rodada: 1, mestre: false};
		for (let i = 0; i < tamanho; i++) {
			jogador4.cartas.push(cartas.pop());
		}

		await admin.firestore().doc(`salas/${data.id}/jogador4/1`).set(jogador4, {merge: true});
	}

	const sala = {...data, iniciado: true};
	await admin.firestore().doc(`salas/${data.id}`).set(sala, {merge: true});

	return sala;
});

export const enviarCriterio = functions.https.onCall(async (data, context) => {
	const sala = data.sala;

	const jogador1Snapshot = await admin.firestore().collection(`salas/${sala.id}/jogador1`).get();
	let mao1: any[] = jogador1Snapshot.docs.map(doc => ({...doc.data()}));

	// @ts-ignore
	let [carta1, ...cartas1] = mao1.cartas;

	// @ts-ignore
	mao1.cartas = castas1;

	const jogador2Snapshot = await admin.firestore().collection(`salas/${sala.id}/jogador2`).get();
	let mao2: any[] = jogador2Snapshot.docs.map(doc => ({...doc.data()}));


	return mao1;
});
