import Routes from './Routes'

export interface Hangzone {
  id: string
  name: string
  isPrivate: boolean
  description: string
}

export interface ISettings {
  gpsOn: boolean
  emailOnFriendHang: boolean
  notifications: boolean
}

export interface IProfile {
  id: string
  anonymous: boolean
  name: string
  bio: string
  photo?: string
  email: string
}

export enum Status { 
  Active = 'active',
  Inactive = 'inactive',
  Offline = 'offline',
}

export interface IFriend {
  displayName: string,
  id: string
  photoURL: string,
  status: Status
}

export {
  Routes
}
