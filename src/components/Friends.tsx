import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import appStoreContext from '../stores/appStoreContext'
import firebaseContext from '../firebaseContext'
import FriendsList from './FriendsList'
import { getProfile } from '../db/profiles'
import './Friends.scss'

interface Props {

}

const Friends: React.SFC<Props> = () => {
  const [search, updateSearch] = useState('')
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const { firebaseUser, profile } = appStore
  const [friendProfiles, updateFriendProfiles] = useState([])
  const filteredFriends = appStore.friends.filter((cur) => {
    const searchRegex = new RegExp(`.*${search}.*`, 'i')
    return searchRegex.test(cur.displayName)
  })

  function getFriendProfiles() {
    if (firebaseUser && profile) {
      Object.keys(profile.friendIds).forEach(id => {
        const friendProfile = getProfile(id)
        updateFriendProfiles([...friendProfiles, friendProfile])
      })
    }
  }
  
  getFriendProfiles()

  const handleAddFriend = () => {
    if (firebaseUser && profile) { 
      profile.friendIds = {...profile.friendIds, [firebaseUser.uid]: true}
      console.log(profile.friendIds[firebaseUser.uid])
    }
  }

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
