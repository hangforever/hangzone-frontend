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
  settings: ISettings = {
    gpsOn: true,
    emailOnFriendHang: true,
    notifications: true,
  };

  // addHangzone(
  //   name: string,
  //   description: string,
  //   position: LatLng,
  //   isPrivate: boolean = true
  // ) {
  //   console.log(this.profile);
  //   const hangzone: Hangzone = {
  //     name,
  //     description,
  //     isPrivate,
  //     position,
  //     checkedInProfileIds: [],
  //     adminProfileZIds: [],
  //   };
  //   this.hangzones.push(hangzone);
  // }

  get profilePhoto() {
    return this.profile?.photoURL || this.firebaseUser?.photoURL || '';
  }
}
decorate(AppStore, {
  loading: observable,
  signedIn: observable,
  firebaseUser: observable,
  profile: observable,
  friendProfiles: observable,
  settings: observable,
  profilePhoto: computed,
});

const appStore = new AppStore();

export { appStore };
export default createContext(appStore);
