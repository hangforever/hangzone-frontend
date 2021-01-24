import { Router } from 'express';
// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as faker from 'faker';
import { IGetUserAuthInfoRequest, IProfile, Hangzone, LatLng } from './types';
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

/**
 * Get ones own profile
 */
router.get('/', async (req: IGetUserAuthInfoRequest, res) => {
  const hangzones: Hangzone[] = new Array(5)
    .fill(0)
    .map(() => randomHangzone());
  return res.json(utils.successData({ hangzones }));
});

export default router;
