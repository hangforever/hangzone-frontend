import { observable } from 'mobx'
import { Hangzone } from '../types'

export class AppStore {
  hangzones: Hangzone[] = observable([])

  addTodo(name: string, description: string, isPrivate: boolean = true) {
    const hangzone = { id: this.hangzones.length.toString(), name, description, isPrivate }
    this.hangzones.push(hangzone)
  }

  removeTodo(id: string) {
    this.hangzones = this.hangzones.filter(h => h.id !== id)
  }
}
