import { createContext } from 'react'
import { observable, action } from 'mobx'
import { Hangzone } from '../types'

export class AppStore {
  user = observable.box<null | firebase.User>(null)
  hangzones = observable.array<Hangzone>([]) // https://mobx.js.org/refguide/array.html
  wordOfTheDay = observable.box('FARTS') // https://mobx.js.org/refguide/boxed.html

  addHangzone = action((name: string, description: string, isPrivate: boolean = true) => {
    const hangzone = { id: this.hangzones.length.toString(), name, description, isPrivate }
    this.hangzones.push(hangzone)
  })

  removeHangzone = action((id: string) => {
    this.hangzones.replace(this.hangzones.filter(h => h.id !== id))
  })

  updateWordOfTheDay = action((newWord: string) => {
    this.wordOfTheDay.set(newWord)
  })
}

export default createContext(new AppStore())