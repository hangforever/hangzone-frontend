import { IGetUserAuthInfoRequest, IProfile } from './types';
import * as admin from 'firebase-admin';
type HangzoneApiErrorStatus = 403 | 404 | 422 | 500;
type ResourceDict = { [resourceName: string]: any };

export function successData(data: ResourceDict) {
  return {
    status: 200,
    message: '',
    data,
  };
}

export function errorData(status: HangzoneApiErrorStatus, message: string) {
  return {
    status,
    message,
  };
}

export function requiredParameterChecker(params: ResourceDict): string | null {
  if (!params) throw new Error('requiredParameterChecker requires params');

  for (const [key, val] of Object.entries(params)) {
    if (!val) return `${key} is a required parameter`;
  }
  return null;
}

export async function getOwnProfile(req: IGetUserAuthInfoRequest) {
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
