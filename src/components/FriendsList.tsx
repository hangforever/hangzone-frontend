import React, { useContext } from 'react'
import { IFriend, IProfile } from '../types'
import StatusMark from './StatusMark'
import './FriendsList.scss'

interface Props {
  friends: IProfile[]
}


const FriendsList: React.SFC<Props> = ({ friends }) => (
    <div className="FriendsList">
      <ul>
        {friends.map(friend => 
          <li className="FriendsList__friend">
            <div className="FriendsList__friend-photo">
              <img src={friend.photoURL} alt="profile"/>
            </div>
            <div className="FriendsList__friend-display-name">{friend.displayName}</div>
            {/* // TODO: replace with proper friend status from db
            <div className="FriendsList__friend-status">{friend.status}</div>
            <StatusMark status={friend.status} /> */}
          </li>)}
      </ul>
    </div>
)

export default FriendsList
