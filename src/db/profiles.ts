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
