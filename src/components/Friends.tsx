import React, { useState, useContext, useEffect, useDebugValue } from 'react'
import { observer } from 'mobx-react-lite'
import appStoreContext from '../stores/appStoreContext'
import firebaseContext from '../firebaseContext'
import FriendsList from './FriendsList'
import { getFriendProfiles } from '../db/profiles'
import './Friends.scss'
import { IProfile } from 'types'


interface Props {

}

const Friends: React.SFC<Props> = () => {
  const [search, updateSearch] = useState('')
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const { firebaseUser, profile, friendProfiles } = appStore
  const [friendProfileState, updateFriendProfiles] = useState(friendProfiles)

  const filteredFriends = friendProfileState.filter((cur) => {
    const searchRegex = new RegExp(`.*${search}.*`, 'i')
    return searchRegex.test(cur.displayName)
  })

  console.log('friendState', friendProfileState)
  console.log('friend profiles from store' , friendProfiles)
  console.log(friendProfiles[0].displayName)
  console.log('im dumb', profile?.friendIds)


  const handleAddFriend = () => {
    // if (firebaseUser && profile) { 
    //   const idToAdd: string | null = prompt('add this friend id')
    //   profile.friendIds = {...profile.friendIds, [idToAdd]: true}
    //   console.log(profile.friendIds)
    // }
  }


  // useEffect(() => {
  //   if (profile) {
  //     1. get all UIDs necessary to contact DB
  //     const friendUids = Object.keys(profile.friendIds)
  //     console.log(friendUids)
  //     if(friendUids.length > 0) {
  //       getFriendProfiles(friendUids).then(friendProfiles => updateFriendProfiles(friendProfiles))
  //     }

  //     2. use those IDs to perform a query for profiles on the DB
  //       made getFriendProfiles function in db/profiles 
  //       called in index.tsx, manually passing string for testing

  //     3. Take that result and set the friends state of the store
  //       attempted to add friendProfiles to appStor
  //     console.log('friendProfiles:', friendProfileState)
  //   }
  // }, [profile, friendProfileState])

  return firebaseUser && profile ? (
    <div className="Friends">
      <p>logged in user id: {firebaseUser.uid}</p>
      <div className="Friends__search">
        <input
          type="text"
          placeholder="search friends list"
          className="input__search input-primary"
          name="search"
          value={search}
          onChange={e => updateSearch(e.target.value)} 
        />
      </div>
      <div className="Friends__friends-list">
        <FriendsList friends={filteredFriends}/>
      </div>
      <div className="Friends__controls">
        <button 
          className="button__add-friend button-primary"
          onClick={handleAddFriend}
        >
          Add Friend
        </button>
      </div>
    </div>
  ) : null
}

export default observer(Friends)
