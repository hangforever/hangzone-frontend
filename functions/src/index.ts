import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import profilesRouter from './profiles';

admin.initializeApp();

// https://firebase.google.com/docs/functions/typescript
const app = express();

app.use('/profiles', profilesRouter);

export const api = functions.https.onRequest(app);
