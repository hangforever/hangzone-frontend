import React, { useState, useContext, useEffect, useDebugValue } from 'react'
import { observer } from 'mobx-react-lite'
import appStoreContext from '../stores/appStoreContext'
import firebaseContext from '../firebaseContext'
import FriendsList from './FriendsList'
import { getFriendProfiles } from '../db/profiles'
import './Friends.scss'


interface Props {

}

const Friends: React.SFC<Props> = () => {
  const [search, updateSearch] = useState('')
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const { firebaseUser, profile, friendProfiles } = appStore
  const [friendProfileState, updateFriendProfiles] = useState([])

  const filteredFriends = appStore.friends.filter((cur) => {
    const searchRegex = new RegExp(`.*${search}.*`, 'i')
    return searchRegex.test(cur.displayName)
  })


  const handleAddFriend = () => {
    if (firebaseUser && profile) { 
      profile.friendIds = {...profile.friendIds, [firebaseUser.uid]: true}
      console.log(profile.friendIds)
    }
  }


  useEffect(() => {
    if (profile && friendProfiles) {
      // get all UIDs necessary to contact DB
      const friendUids = Object.keys(profile.friendIds)

      // use those IDs to perform a query for profiles on the DB
      // forced strings for testing
      // const friendProfiles = getFriendProfiles(['CqMfzAa07hb16H45UMG3tCxeJAg2', 'I3p7f3fAxoQchzUkdwoUYc3Knsq2'])
      // take the result and set the friends state of the store 
      // profile.friendIds = {...profile.friendIds, ...friendProfiles}
      console.log(friendProfiles)
      console.log(profile.friendIds)
    }
  }, [profile, friendProfiles])

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
