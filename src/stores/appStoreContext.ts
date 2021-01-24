import { createContext } from 'react';
import firebase from 'firebase';
import { observable, action, decorate, computed } from 'mobx';
import { Hangzone, ISettings, IProfile } from 'types';
import * as hangzoneAPI from 'api/hangzones';

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
  //     adminProfileIds: [],
  //   };
  //   this.hangzones.push(hangzone);
  // }

  async checkIn(hangzoneId: string): Promise<Hangzone | null> {
    if (this.profile) {
      const hangzone = await hangzoneAPI.checkIn(hangzoneId);
      this.profile.hangzoneId = hangzone.id;
      return hangzone;
    }
    return null;
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
  friendProfiles: observable,
  settings: observable,
  profilePhoto: computed,
  checkIn: action,
});

const appStore = new AppStore();

export { appStore };
export default createContext(appStore);
