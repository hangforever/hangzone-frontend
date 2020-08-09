import { IProfile } from 'types'

export function createProfile(userUID: string, displayName: string): IProfile {
  return {
    userUID,
    displayName,
    friendIds: {},
    bio: 'Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time. Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time. Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time. Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time.',
    photoURL: 'https://a-listzante.com/wp-content/uploads/2019/11/zante-event-tickets-2.jpg',
  }
}
