import { createContext } from 'react'
import { observable, action, decorate } from 'mobx'
import { Hangzone, ISettings, IProfile, IUser } from 'types'

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
}
decorate(AppStore, {
  wordOfTheDay: observable,
  user: observable,
  hangzones: observable,
  settings: observable,
  addHangzone: action,
  removeHangzone: action,
  updateHangzone: action,
  setWordOfTheDay: action
})

export default createContext(new AppStore())