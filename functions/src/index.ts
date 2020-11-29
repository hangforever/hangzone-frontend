import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import profilesRouter from './profiles';
import { IGetUserAuthInfoRequest } from './types';
import * as utils from './apiUtils';

admin.initializeApp();

// https://firebase.google.com/docs/functions/typescript
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(403).json(utils.errorData(403, 'Unauthorized'));
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    res.status(403).json(utils.errorData(403, 'Unauthorized'));
    return;
  }
};

app.use('/profiles', authenticate, profilesRouter);

export const api = functions.https.onRequest(app);