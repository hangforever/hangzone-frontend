import { createContext } from 'react'
import { observable, action } from 'mobx'
import { Hangzone } from '../types'

class AppStore {
  hangzones = observable<Hangzone>([])

  addHangzone = action((name: string, description: string, isPrivate: boolean = true) => {
    const hangzone = { id: this.hangzones.length.toString(), name, description, isPrivate }
    this.hangzones.push(hangzone)
  })

  removeHangzone = action((id: string) => {
    console.log('this.hangzones.filter(h => h.id !== id)', this.hangzones.filter(h => h.id !== id))
    this.hangzones.replace(this.hangzones.filter(h => h.id !== id))
  })
}

export default createContext(new AppStore())