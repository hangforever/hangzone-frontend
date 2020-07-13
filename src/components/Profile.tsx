import React, {useState, useContext} from 'react'
import { appStoreContext } from 'stores'
import { IProfile } from 'types'

const Profile = () => {
  console.log(useState('something cool'))
  const appStore = useContext(appStoreContext)
  const [profile, updateProfile] = useState<IProfile>({...appStore.profile})
  return (
    <div>
      <div>user name:{profile.name}</div>
      <div>user id:{profile.id}</div>
      <div>user bio:{profile.bio}</div>
      <input type="text"/>
      <div>profile photo</div>
      <button>add photo</button>
      <div><img src="" alt="photo here"/></div>
      <div>email: {profile.email}</div>
      <button>change password</button>
    </div>
  )
}

export default Profile