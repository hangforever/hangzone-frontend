import { IProfile } from 'types'

export function createProfile(displayName: string, options: Partial<IProfile> = {}): IProfile {
  return {
    displayName,
    friendIds: {},
    bio: options.bio || '',
    photoURL: options.photoURL || '/blank_hanger.png',
  }
}
