import React, { useState, useContext } from 'react'
import FriendsList from './FriendsList'
import appStoreContext from '../stores/appStoreContext'
import './Friends.scss'

interface Props {

}

const Friends: React.SFC<Props> = () => {
  const [search, updateSearch] = useState('')
  const appStore = useContext(appStoreContext)
  const filteredFriends = appStore.friends.filter((cur) => {
    const searchRegex = new RegExp(`.*${search}.*`, 'i')
    return searchRegex.test(cur.displayName)
  })

  function handleAddFriend() {
    alert('Unimplemented!')
  }
  return (
    <div className="Friends">
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
  )
}

export default Friends
