import { firebase } from 'firebaseContext'
import { IProfile } from 'types'

export async function createProfile(firebaseUserUID: string, displayName: string, options: Partial<IProfile> = {}): Promise<IProfile | undefined> {
  const profile = {
    displayName,
    friendIds: {},
    bio: options.bio || '',
    photoURL: options.photoURL || '/blank_hanger.png',
  }
  const docRef = await firebase.firestore().collection('profiles').doc(firebaseUserUID)
  await docRef.set(profile)
  const createdProfile = await docRef.get()
  return createdProfile.data() as IProfile | undefined
}

export async function getProfile(firebaseUserUID: string): Promise<IProfile | null> {
  const profile = await firebase.firestore()
    .collection('profiles')
    .doc(firebaseUserUID)
    .get()
    .then(doc => doc.data()) as IProfile | null
  return profile
}