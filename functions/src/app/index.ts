import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {region} from '../service-account-key';

export const appCreateProfile = functions.region(region).auth.user()
	.onCreate((user) => {
		const {uid, displayName, photoURL, phoneNumber, email} = user;

		return admin.firestore().doc(`/usuarios/${uid}`).set({
			uid, displayName, photoURL, phoneNumber, email
		}, {merge: true});
	});
