import { Router } from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IGetUserAuthInfoRequest, IProfile } from './types';
import * as utils from './apiUtils';

const router = Router();

// Route Code
router.get('/:id', (req, res) => {
  functions.logger.log('User requested the profile with ID:', req.params.id);
  res.send('OK');
});

router.post('/', async (req: IGetUserAuthInfoRequest, res) => {
  const { profile: profileData } = req.body;
  // check required params
  const paramErr = utils.requiredParameterChecker({
    profile: profileData,
  });
  if (paramErr) return res.status(422).json(utils.errorData(422, paramErr));

  try {
    if (!req.user?.uid) throw new Error('Not a valid user');

    const profile = await createProfile(req.user?.uid, profileData);
    if (!profile) throw new Error('Firestore did not return data');

    return res.json(utils.successData({ profile }));
  } catch (e) {
    functions.logger.log(`Error creating profile: ${e}`);
    return res.status(500).json(utils.errorData(500, e.message));
  }
});

// Firestore Code
async function createProfile(
  firebaseUserUID: string,
  profile: Partial<IProfile> = {}
): Promise<IProfile | undefined> {
  if (!profile.displayName) {
    throw Error('Display name is required');
  }
  const newProfile = {
    displayName: profile.displayName,
    friendIds: {},
    bio: profile.bio || '',
    photoURL: profile.photoURL || '/blank_hanger.png',
  };
  const docRef = await admin
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID);
  await docRef.set(newProfile);
  const createdProfile = await docRef.get();
  return createdProfile.data() as IProfile | undefined;
}

export default router;
