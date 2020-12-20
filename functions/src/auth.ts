import { Router } from 'express';
import * as admin from 'firebase-admin';
import { IGetUserAuthInfoRequest } from './types';
import * as utils from './apiUtils';

const router = Router();

// ROUTE CODE

/**
 * Sign up for hangzone
 * @param email: string
 * @param password: string
 * @return { user: string }
 */
router.post('/signup', async (req: IGetUserAuthInfoRequest, res) => {
  const { email, password } = req.body;
  const paramErr = utils.requiredParameterChecker({
    email,
    password,
  });
  if (paramErr) return res.status(422).json(utils.errorData(422, paramErr));

  const user = await admin
    .auth()
    .createUser({
      email,
      emailVerified: false,
      password,
      disabled: false,
    })
    .catch(function (error) {
      console.error(error.code, error.message);
    });

  if (user) {
    return res.json(
      utils.successData({
        user: user.toJSON(),
      })
    );
  }
  res.statusCode = 404;
  return res.json(utils.errorData(404, 'User could not be created.'));
});

export default router;
