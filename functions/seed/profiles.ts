import * as admin from 'firebase-admin';
import * as faker from 'faker';

function createProfile(friendIds: string[]) {
  return {
    bio: faker.hacker.phrase(),
    displayName: faker.hacker.noun(),
    friendIds,
    photoURL: '',
  };
}

export default async function seedProfiles(uids: string[]) {
  return uids.map(async (uid) => {
    const friendIds = uids.filter((otherUid) => otherUid !== uid);
    const newProfile = createProfile(friendIds);

    const docRef = await admin.firestore().collection('profiles').doc(uid);
    await docRef.set(newProfile);
    return docRef.id;
  });
}
