import React, { useContext } from 'react'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import { IFriend } from '../types'
import StatusMark from './StatusMark'
import './FriendsList.scss'

interface Props {
  friends: IFriend[]
}

const FriendsList: React.SFC<Props> = ({ friends }) => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  console.log(appStore)
  return (
    <div className="FriendsList">
      <ul>
        {friends.map(friend => 
          <li className="FriendsList__friend">
            <div className="FriendsList__friend-photo">
              <img src={friend.photoURL} alt="profile"/>
            </div>
            <div className="FriendsList__friend-display-name">{friend.displayName}</div>
            <div className="FriendsList__friend-status">{friend.status}</div>
            <StatusMark status={friend.status} />
          </li>)}
      </ul>
    </div>
)}

export default FriendsList
