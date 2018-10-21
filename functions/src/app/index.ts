import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {HttpsError} from 'firebase-functions/lib/providers/https';
import {region} from '../service-account-key';

export const appCreateProfile = functions.region(region).auth.user()
	.onCreate((user) => {
		const {uid, displayName, photoURL, phoneNumber, email} = user;

		return admin.firestore().doc(`/usuarios/${uid}`).set({
			uid, displayName, photoURL, phoneNumber, email
		}, {merge: true});
	});

export const entrarSala = functions.region(region).https.onCall(async (data, context) => {
	if (!context.auth && data.jogador.uid === context.auth.uid) {
		return new HttpsError('failed-precondition', 'Usuário não autenticado.', 'O usuário deve estar autenticado.');
	}

	const queryRef = admin.firestore().collection('salas')
		.where("codigoAcesso", "==", data.codigoAcesso)
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

	return new HttpsError('unavailable', 'A sala não existe ou encontra-se cheia.', 'A sala não existe ou encontra-se cheia.');
});
