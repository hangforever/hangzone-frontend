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
    adminProfileZIds: [],
    position: randomPos(),
  };
}

let hangzones: Hangzone[] = new Array(2).fill(0).map(() => randomHangzone());

/**
 * Get ones own profile
 */
router.get('/', async (req: IGetUserAuthInfoRequest, res) => {
  return res.json(utils.successData({ hangzones }));
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

export default router;
