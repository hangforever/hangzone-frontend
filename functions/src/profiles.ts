import { Router } from 'express';
import * as functions from 'firebase-functions';

const router = Router();

router
  .get('/:id', (req, res) => {
    functions.logger.log('User requested the profile with ID:', req.params.id);
    res.send('OK');
  })
  .post('/', (req, res) => {
    functions.logger.log('User requested to create a profile');
    res.send('OK');
  });

// export async function createProfile(
//   firebaseUserUID: string,
//   displayName: string,
//   options: Partial<IProfile> = {}
// ): Promise<IProfile | undefined> {
//   const profile = {
//     displayName,
//     friendIds: {},
//     bio: options.bio || '',
//     photoURL: options.photoURL || '/blank_hanger.png',
//   };
//   const docRef = await firebase
//     .firestore()
//     .collection('profiles')
//     .doc(firebaseUserUID);
//   await docRef.set(profile);
//   const createdProfile = await docRef.get();
//   return createdProfile.data() as IProfile | undefined;
// }

export default router;
