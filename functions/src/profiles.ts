import { Router } from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IProfile } from './types';

const router = Router();

router.get('/:id', (req, res) => {
  functions.logger.log('User requested the profile with ID:', req.params.id);
  res.send('OK');
});

router.post('/', async (req, res) => {
  const { id, name } = req.body;
  if (!(id || name)) {
    return res.send('Error');
  }

  await createProfile(id, name);
  return res.send('OK');
});

export async function createProfile(
  firebaseUserUID: string,
  displayName: string,
  options: Partial<IProfile> = {}
): Promise<IProfile | undefined> {
  const profile = {
    displayName,
    friendIds: {},
    bio: options.bio || '',
    photoURL: options.photoURL || '/blank_hanger.png',
  };
  const docRef = await admin
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID);
  await docRef.set(profile);
  const createdProfile = await docRef.get();
  return createdProfile.data() as IProfile | undefined;
}

export default router;
