import { IProfile } from 'types'

export function createProfile(displayName: string, options: Partial<IProfile> = {}): IProfile {
  return {
    displayName,
    friendIds: {},
    bio: options.bio || '',
    photoURL: options.photoURL || 'https://a-listzante.com/wp-content/uploads/2019/11/zante-event-tickets-2.jpg',
  }
}
