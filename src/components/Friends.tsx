import React, { useState, useContext } from 'react';
import FriendsList from './FriendsList';
import './Friends.scss';

interface Props {}

const Friends: React.FC<Props> = () => {
  const [search, updateSearch] = useState('');
  // const { firebaseUser, profile, friendProfiles } = appStore;

  const handleAddFriend = () => {
    /***
     TODO: handle adding new friends, here's an idea
     ****
      if (firebaseUser && profile) { 
      const idToAdd: string | null = prompt('add this friend id')
      profile.friendIds = {...profile.friendIds, [idToAdd]: true}
      console.log(profile.friendIds)
    }
     */
  };

  return false ? (
    <div className="Friends">
      <div className="Friends__search">
        <input
          type="text"
          placeholder="search friends list"
          className="input__search input-primary"
          name="search"
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
        />
      </div>
      <div className="Friends__friends-list">
        <FriendsList friends={[]} />
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
  ) : (
    <div className="Friends">
      <div className="Friends__message">
        <p>It seems you have no friends :'(</p>
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
  );
};

export default Friends;
