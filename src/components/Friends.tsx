import React, { useState } from 'react'
import FriendsList from './FriendsList'
import './Friends.scss'

interface Props {

}

const Friends: React.SFC<Props> = () => {
  const [search, updateSearch] = useState('')
  function handleAddFriend() {
    alert('Unimplemented!')
  }
  return (
    <div className="Friends">
      <div className="Friends__search">
        <input
          type="text"
          placeholder="search friends list"
          className="input__search"
          name="search"
          value={search}
          onChange={e => updateSearch(e.target.value)} 
        />
      </div>
      <div className="Friends__friends-list">
        <FriendsList />
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
