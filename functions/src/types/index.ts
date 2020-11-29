import { Request } from 'express';
import * as admin from 'firebase-admin';

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

export interface IGetUserAuthInfoRequest extends Request {
  user?: admin.auth.DecodedIdToken; // or any other type
}
