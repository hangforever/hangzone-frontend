import { createContext } from 'react'
import { observable, action, decorate } from 'mobx'
import { Hangzone, ISettings, IProfile } from 'types'

export class AppStore {
  wordOfTheDay: string = 'FARTS'
  user: null | firebase.User = null
  hangzones: Hangzone[] = [] // https://mobx.js.org/refguide/array.html
  settings: ISettings = {
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
  }
  profile: IProfile = {
    id: '123',
    anonymous: true,
    name: 'xXxTakara89Xx',
    bio: 'Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time. Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time. Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time. Tokyo\'s number one birthday BITCH. Having a really good time, ALL the time.',
    photo: 'https://a-listzante.com/wp-content/uploads/2019/11/zante-event-tickets-2.jpg',
    email: 'takara89@hotmail.biz'
  }

  addHangzone = action((name: string, description: string, isPrivate: boolean = true) => {
    const hangzone = { id: this.hangzones.length.toString(), name, description, isPrivate }
    this.hangzones.push(hangzone)
  })

  removeHangzone = action((id: string) => {
    this.hangzones = this.hangzones.filter(h => h.id !== id)
  })

  updateHangzone = action((id: string, diff: Partial<Hangzone>) => {
    const newHangzones = this.hangzones.map(h => h.id === id ? { ...h, ...diff } : h)
    this.hangzones = newHangzones
  })

  setWordOfTheDay(newWord: string) {
    this.wordOfTheDay = newWord
  }
}
decorate(AppStore, {
  wordOfTheDay: observable,
  user: observable,
  hangzones: observable,
  settings: observable,
  profile: observable,
})

export default createContext(new AppStore())