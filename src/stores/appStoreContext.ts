import { createContext } from 'react'
import { observable, action, decorate } from 'mobx'
import { Hangzone, ISettings, IProfile, IFriend, Status } from 'types'

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

  friends: IFriend[] = [
    {
      displayName: 'daaaaan',
      id: 'songthing',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Dan_Stevens_at_Premiere_of_Beauty_and_the_Beast_%28cropped%29.jpg/400px-Dan_Stevens_at_Premiere_of_Beauty_and_the_Beast_%28cropped%29.jpg',
      status: Status.Active 
    },
    {
      displayName: 'DP',
      id: 'songthing-dp',
      photoURL: 'https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/m/o/moudfdmmnmelyel-1.jpg',
      status: Status.Active 
    },
    {
      displayName: 'Nate Dog',
      id: 'songthing-nate-dog',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Nate_dogg_rapradar.jpg/220px-Nate_dogg_rapradar.jpg',
      status: Status.Offline 
    },
    {
      displayName: 'Nate Dog',
      id: 'songthing-nate-dog',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Nate_dogg_rapradar.jpg/220px-Nate_dogg_rapradar.jpg',
      status: Status.Offline 
    }
  ]

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
  profile: observable,
  addHangzone: action,
  removeHangzone: action,
  updateHangzone: action,
  setWordOfTheDay: action
})

export default createContext(new AppStore())