import * as  admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {serviceAccountKey} from './service-account-key';

// não faz nada, mas sem isso não publica no firebase.
const config = functions.config().firebase || {};

// firebase service account key
const credential = admin.credential.cert(JSON.parse(serviceAccountKey));

// firebase app initialization
admin.initializeApp({credential, ...config});

// use of timestamp in firestore
admin.firestore().settings({timestampsInSnapshots: true});

export {appCreateProfile} from './app';

