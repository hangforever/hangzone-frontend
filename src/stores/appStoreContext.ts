import { createContext } from 'react'
import { observable, action, decorate, computed } from 'mobx'
import { Hangzone, ISettings, IProfile, IFriend, Status } from 'types'

export class AppStore {
  loading: boolean = true
  firebaseUser: firebase.User | null = null
  profile: IProfile | null = null
  friendProfiles: IProfile[] = []
  wordOfTheDay: string = 'FARTS'
  hangzones: Hangzone[] = [] // https://mobx.js.org/refguide/array.html
  settings: ISettings = {
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
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

  get profilePhoto() {
    return this.profile?.photoURL || this.firebaseUser?.photoURL || ''
  }
}
decorate(AppStore, {
  loading: observable,
  wordOfTheDay: observable,
  firebaseUser: observable,
  profile: observable,
  hangzones: observable,
  settings: observable,
  addHangzone: action,
  removeHangzone: action,
  updateHangzone: action,
  setWordOfTheDay: action,
  profilePhoto: computed,
})

const appStore = new AppStore()

export { appStore }
export default createContext(appStore)