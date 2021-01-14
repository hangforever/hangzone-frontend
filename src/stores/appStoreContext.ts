import { createContext } from 'react';
import firebase from 'firebase';
import { observable, action, decorate, computed } from 'mobx';
import { Hangzone, ISettings, IProfile } from 'types';

export class AppStore {
  loading: boolean = true;
  signedIn: boolean = false;
  firebaseUser: firebase.User | null = null;
  profile: IProfile | null = null;
  friendProfiles: IProfile[] = [];
  wordOfTheDay: string = 'FARTS';
  hangzones: Hangzone[] = []; // https://mobx.js.org/refguide/array.html
  settings: ISettings = {
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
  };

  addHangzone(name: string, description: string, isPrivate: boolean = true) {
    const hangzone = {
      id: this.hangzones.length.toString(),
      name,
      description,
      isPrivate,
    };
    this.hangzones.push(hangzone);
  }

  removeHangzone(id: string) {
    this.hangzones = this.hangzones.filter((h) => h.id !== id);
  }

  updateHangzone(id: string, diff: Partial<Hangzone>) {
    const newHangzones = this.hangzones.map((h) =>
      h.id === id ? { ...h, ...diff } : h
    );
    this.hangzones = newHangzones;
  }

  setWordOfTheDay(newWord: string) {
    this.wordOfTheDay = newWord;
  }

  get profilePhoto() {
    return this.profile?.photoURL || this.firebaseUser?.photoURL || '';
  }
}
decorate(AppStore, {
  loading: observable,
  signedIn: observable,
  wordOfTheDay: observable,
  firebaseUser: observable,
  profile: observable,
  hangzones: observable,
  friendProfiles: observable,
  settings: observable,
  addHangzone: action,
  removeHangzone: action,
  updateHangzone: action,
  setWordOfTheDay: action,
  profilePhoto: computed,
});

const appStore = new AppStore();

export { appStore };
export default createContext(appStore);
