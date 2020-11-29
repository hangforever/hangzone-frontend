import { Router } from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IGetUserAuthInfoRequest, IProfile } from './types';
import * as utils from './apiUtils';

const router = Router();

// Route Code
router.get('/', async (req: IGetUserAuthInfoRequest, res) => {
  const profile = await getOwnProfile(req);
  return res.json(utils.successData({ profile }));
});

router.get('/friends', async (req: IGetUserAuthInfoRequest, res) => {
  const firebaseUserUID = req.user?.uid;
  if (!firebaseUserUID) throw new Error('Not a valid user');

  const profile = await getOwnProfile(req);
  if (!profile) throw new Error('User does not have profile');

  const friendUserIds = Object.keys(profile.friendIds);
  if (!friendUserIds.length) {
    return res.json(utils.successData({ friendProfiles: [] }));
  }

  const friendProfiles: IProfile[] = await admin
    .firestore()
    .collection('profiles')
    .where(admin.firestore.FieldPath.documentId(), 'in', friendUserIds)
    .get()
    .then((res) => {
      let result: IProfile[] = [];
      res.forEach((doc) => {
        const data = doc.data();
        if (data) {
          result.push(data as IProfile);
        }
      });
      return result;
    });

  return res.json(utils.successData({ friendProfiles }));
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

router.put('/', async (req: IGetUserAuthInfoRequest, res) => {
  const firebaseUserUID = req.user?.uid;
  if (!firebaseUserUID) throw new Error('Not a valid user');

  const { profile: profileData } = req.body;
  // check required params
  const paramErr = utils.requiredParameterChecker({
    profile: profileData,
  });
  if (paramErr) return res.status(422).json(utils.errorData(422, paramErr));

  const docRef = await admin
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID);
  await docRef.set(profileData);
  const createdProfile = await docRef.get();

  return res.json(utils.successData({ profile: createdProfile }));
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

async function getOwnProfile(req: IGetUserAuthInfoRequest) {
  const firebaseUserUID = req.user?.uid;
  if (!firebaseUserUID) throw new Error('Not a valid user');

  const profile = (await admin
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID)
    .get()
    .then((doc) => doc.data())) as IProfile | null;

  return profile;
}

export default router;
