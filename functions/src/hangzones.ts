import { Router } from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as faker from 'faker';
import { IGetUserAuthInfoRequest, Hangzone, LatLng } from './types';
import * as utils from './apiUtils';

const router = Router();

// ROUTE CODE

function randomPos(): LatLng {
  const topLeft = [35.66536916217306, 139.66678841150056];
  const bottomRight = [35.66288928124456, 139.66881616151582];

  return [
    topLeft[0] + Math.random() * (bottomRight[0] - topLeft[0]),
    topLeft[1] + Math.random() * (bottomRight[1] - topLeft[1]),
  ];
}

function randomHangzone(): Hangzone {
  return {
    id: faker.random.uuid(),
    name: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    isPrivate: Boolean(Math.round(Math.random())),
    checkedInProfileIds: [],
    adminProfileIds: [],
    position: randomPos(),
  };
}

let hangzones: Hangzone[] = new Array(10).fill(0).map(() => randomHangzone());

/**
 * Get ones own profile
 */
router.get('/', async (req: IGetUserAuthInfoRequest, res) => {
  return res.json(utils.successData({ hangzones }));
});

/**
 * Create a hangzone
 */
router.post('/', async (req: IGetUserAuthInfoRequest, res) => {
  const firebaseUserUID = req.user?.uid;
  if (!firebaseUserUID) throw new Error('Not a valid user');

  const { hangzone: hangzoneData } = req.body;
  // check required params
  const paramErr = utils.requiredParameterChecker({
    hangzone: hangzoneData,
  });
  if (paramErr) return res.status(422).json(utils.errorData(422, paramErr));

  try {
    if (!req.user?.uid) throw new Error('Not a valid user');

    const hangzone = await createHangzone(hangzoneData);
    if (!hangzone) throw new Error('Firestore did not return data');

    return res.json(utils.successData({ hangzone: hangzoneData }));
  } catch (e) {
    functions.logger.log(`Error creating profile: ${e}`);
    return res.status(500).json(utils.errorData(500, e.message));
  }
});

/**
 * Check into a hangzone
 */
router.post('/checkin', async (req: IGetUserAuthInfoRequest, res) => {
  const firebaseUserUID = req.user?.uid;
  if (!firebaseUserUID) throw new Error('Not a valid user');

  const { hangzoneId } = req.body;
  // check required params
  const paramErr = utils.requiredParameterChecker({
    hangzoneId,
  });
  if (paramErr) return res.status(422).json(utils.errorData(422, paramErr));

  const hangzone = hangzones.find((zone) => zone.id === hangzoneId);
  if (!hangzone)
    return res
      .status(404)
      .json(utils.errorData(404, 'Hangzone does not exist'));
  if (hangzone.checkedInProfileIds.includes(firebaseUserUID)) {
    return res.json(utils.successData({ hangzone }));
  }

  // Sign in to other hangzone
  hangzone.checkedInProfileIds = [
    ...hangzone.checkedInProfileIds,
    firebaseUserUID,
  ];
  // Sign out of other hangzones
  hangzones = hangzones.map((hang) => {
    if (hang.id === hangzone.id) return hang;

    if (hang.checkedInProfileIds.includes(firebaseUserUID)) {
      hang.checkedInProfileIds = hang.checkedInProfileIds.filter(
        (profId) => profId !== firebaseUserUID
      );
    }
    return hang;
  });

  // Update profile
  const docRef = await admin
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID);

  functions.logger.log(
    `Profile ${firebaseUserUID} checked into hangzone ${hangzone.id}`
  );
  await docRef.update({ hangzoneId });

  return res.json(utils.successData({ hangzone }));
});

async function createHangzone(
  hangzone: Partial<Hangzone> = {}
): Promise<Hangzone | undefined> {
  if (!hangzone.name) {
    throw Error('Display name is required');
  }
  if (!hangzone.description) {
    throw Error('Description is required');
  }
  if (!hangzone.position) {
    throw Error('Position is required');
  }
  const newHangzone = {
    name: hangzone.name,
    description: hangzone.description,
    isPrivate: !!hangzone.isPrivate,
    checkedInProfileIds: [],
    adminProfileIds: [],
    position: hangzone.position,
  };
  const docRef = await admin
    .firestore()
    .collection('hangzones')
    .add(newHangzone);
  const createdHangzone = await docRef.get();
  return createdHangzone.data() as Hangzone | undefined;
}

export default router;
