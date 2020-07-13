import { createContext } from 'react'
import { observable, action } from 'mobx'
import { Hangzone, ISettings, IProfile } from 'types'

export class AppStore {
  user = observable.box<null | firebase.User>(null)
  hangzones = observable.array<Hangzone>([]) // https://mobx.js.org/refguide/array.html
  wordOfTheDay = observable.box('FARTS') // https://mobx.js.org/refguide/boxed.html
  settings = observable.object<ISettings>({
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
  })

  profile = observable.object<IProfile>({
    id: '123',
    name: 'xXxTakara89Xx',
    bio: 'Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time.',
    email: 'takara89@hotmail.biz'
  })

  updateProfile = action((key: keyof IProfile, val: any) => {
    this.profile[key] = val
  })

  updateSettings = action((key: keyof ISettings, val: any) => {
    this.settings[key] = val
  })

  addHangzone = action((name: string, description: string, isPrivate: boolean = true) => {
    const hangzone = { id: this.hangzones.length.toString(), name, description, isPrivate }
    this.hangzones.push(hangzone)
  })

  removeHangzone = action((id: string) => {
    this.hangzones.replace(this.hangzones.filter(h => h.id !== id))
  })

  updateHangzone = action((id: string, diff: Partial<Hangzone>) => {
    this.hangzones.replace(this.hangzones.map(h => h.id === id ? { ...h, ...diff } : h))
  })

  updateWordOfTheDay = action((newWord: string) => {
    this.wordOfTheDay.set(newWord)
  })
}

export default createContext(new AppStore())