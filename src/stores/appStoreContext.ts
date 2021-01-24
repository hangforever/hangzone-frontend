import { createContext } from 'react';
import firebase from 'firebase';
import { observable, action, decorate, computed } from 'mobx';
import { Hangzone, ISettings, IProfile, LatLng } from 'types';

export class AppStore {
  loading: boolean = true;
  signedIn: boolean = false;
  firebaseUser: firebase.User | null = null;
  profile: IProfile | null = null;
  friendProfiles: IProfile[] = [];
  hangzones: Hangzone[] = [];
  settings: ISettings = {
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
  };

  addHangzone(
    name: string,
    description: string,
    position: LatLng,
    isPrivate: boolean = true
  ) {
    console.log(this.profile);
    const hangzone: Hangzone = {
      id: this.hangzones.length.toString(),
      name,
      description,
      isPrivate,
      position,
      checkedInProfileIds: [],
      adminProfileZIds: [],
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

  get profilePhoto() {
    return this.profile?.photoURL || this.firebaseUser?.photoURL || '';
  }
}
decorate(AppStore, {
  loading: observable,
  signedIn: observable,
  firebaseUser: observable,
  profile: observable,
  hangzones: observable,
  friendProfiles: observable,
  settings: observable,
  addHangzone: action,
  removeHangzone: action,
  updateHangzone: action,
  profilePhoto: computed,
});

const appStore = new AppStore();

export { appStore };
export default createContext(appStore);
