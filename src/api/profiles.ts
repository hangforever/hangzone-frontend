import { IProfile } from 'types';
import API from './axios';

/**
 * `profiles` collection
 * Each profile's UID is the UID of the firebaseUser's UID that it is created with
 */

export async function create(
  profile: Partial<IProfile> = {}
): Promise<IProfile> {
  const { data, status } = await API.post('/api/profiles', {
    profile: {
      displayName: profile.displayName,
      friendIds: {},
      bio: profile.bio || '',
      photoURL: profile.photoURL || '/blank_hanger.png',
    },
  });
  if (status !== 200) throw new Error(data.message);
  return data.data.profile;
}

export async function get(): Promise<IProfile | null> {
  const { data, status } = await API.get('/api/profiles');
  if (status !== 200) throw new Error(data.message);
  return data.data.profile;
}

export async function set(profile: IProfile): Promise<IProfile | undefined> {
  const { data, status } = await API.put('/api/profiles', { profile });
  if (status !== 200) throw new Error(data.message);
  return data.data.profile;
}

export async function getFriends(): Promise<IProfile[]> {
  const { data, status } = await API.get('/api/profiles/friends');
  if (status !== 200) throw new Error(data.message);
  return data.data.friendProfiles;
}
