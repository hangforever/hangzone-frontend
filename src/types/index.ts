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
  name: string
  bio: string
  photo?: string
  email: string
}

export {
  Routes
}
