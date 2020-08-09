import { createContext } from 'react'
import { observable, action, decorate, computed } from 'mobx'
import { Hangzone, ISettings, IUser } from 'types'

export class AppStore {
  wordOfTheDay: string = 'FARTS'
  user: null | IUser = null
  hangzones: Hangzone[] = [] // https://mobx.js.org/refguide/array.html
  settings: ISettings = {
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
  }

  addHangzone(name: string, description: string, isPrivate: boolean = true) {
    const hangzone = { id: this.hangzones.length.toString(), name, description, isPrivate }
    this.hangzones.push(hangzone)
  }

  removeHangzone(id: string) {
    this.hangzones = this.hangzones.filter(h => h.id !== id)
  }

  updateHangzone(id: string, diff: Partial<Hangzone>) {
    const newHangzones = this.hangzones.map(h => h.id === id ? { ...h, ...diff } : h)
    this.hangzones = newHangzones
  }

  setWordOfTheDay(newWord: string) {
    this.wordOfTheDay = newWord
  }

  get profilePhoto() {
    return this.user?.profile.photoURL || this.user?.firebaseUser.photoURL || ''
  }
}
decorate(AppStore, {
  wordOfTheDay: observable,
  user: observable,
  hangzones: observable,
  settings: observable,
  addHangzone: action,
  removeHangzone: action,
  updateHangzone: action,
  setWordOfTheDay: action,
  profilePhoto: computed,
})

export default createContext(new AppStore())