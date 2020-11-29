import { firebase } from 'firebaseContext';
import { IProfile } from 'types';
import API from './axios';

/**
 * `profiles` collection
 * Each profile's UID is the UID of the firebaseUser's UID that it is created with
 */

export async function fetchCreateProfile(
  profile: Partial<IProfile> = {}
): Promise<IProfile> {
  const newProfile = {
    displayName: profile.displayName,
    friendIds: {},
    bio: profile.bio || '',
    photoURL: profile.photoURL || '/blank_hanger.png',
  };
  const { data, status } = await API.post('api/profiles', {
    profile: newProfile,
  });
  if (status !== 200) throw new Error(data.message);
  return data.data.profile;
}

export async function getProfile(
  firebaseUserUID: string
): Promise<IProfile | null> {
  const profile = (await firebase
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID)
    .get()
    .then((doc) => doc.data())) as IProfile | null;
  return profile;
}

export async function setProfile(
  firebaseUserUID: string,
  profile: IProfile
): Promise<IProfile | undefined> {
  const docRef = await firebase
    .firestore()
    .collection('profiles')
    .doc(firebaseUserUID);
  await docRef.set(profile);
  const createdProfile = await docRef.get();
  return createdProfile.data() as IProfile | undefined;
}

export async function getFriendProfiles(
  friendUserIds: Array<string>
): Promise<IProfile[]> {
  const friendProfiles: IProfile[] = await firebase
    .firestore()
    .collection('profiles')
    .where(firebase.firestore.FieldPath.documentId(), 'in', friendUserIds)
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
  return friendProfiles;
}
