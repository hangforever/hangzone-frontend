import { firebase } from 'firebaseContext'
import { IProfile } from 'types'

export async function createProfile(userUID: string, displayName: string, options: Partial<IProfile> = {}) {
  const profile = {
    displayName,
    friendIds: {},
    bio: options.bio || '',
    photoURL: options.photoURL || '/blank_hanger.png',
  }
  const docRef = await firebase.firestore().collection('profiles').doc(userUID)
  await docRef.set(profile)
  return docRef
}

export async function getProfile(firebaseUserUID: string): Promise<IProfile | null> {
  const profile = await firebase.firestore()
    .collection('profiles')
    .doc(firebaseUserUID)
    .get()
    .then(doc => doc.data()) as IProfile | null
  return profile
}