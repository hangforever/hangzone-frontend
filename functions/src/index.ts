import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import authRouter from './auth';
import profilesRouter from './profiles';
import hangzonesRouter from './hangzones';
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

app.use(cors({ origin: true }));

app.use('/auth', authRouter);
app.use('/profiles', authenticate, profilesRouter);
app.use('/hangzones', authenticate, hangzonesRouter);

export const api = functions.https.onRequest(app);
