import Routes from './Routes';

export interface Hangzone {
  id: string;
  name: string;
  isPrivate: boolean;
  description: string;
}

export interface ISettings {
  gpsOn: boolean;
  emailOnFriendHang: boolean;
  notifications: boolean;
}

export interface IProfile {
  displayName: string;
  friendIds: { [userId: string]: boolean };
  bio?: string;
  photoURL?: string;
}

export enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Offline = 'offline',
}

export { Routes };
