import './Profile.scss'
import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import { IProfile } from 'types'

interface FieldProps {
  label: string
  initialValue: string
  onSubmit: (value: string) => void
}

const Field: React.SFC<FieldProps> = ({
  label,
  initialValue,
  onSubmit,
}) => {
  const [value, updateValue] = useState(initialValue)
  const [active, updateActive] = useState(false)
  return (
    <div className="Field">
      <label htmlFor={label}>{label}</label>
      {active ? (
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(value)
          updateActive(false)
        }}>
          <input type="text" name={label} value={value} onChange={(e) => updateValue(e.target.value)} />
        </form>
      ) : (
        <div className="field-value" onClick={() => updateActive(true)}>{value}</div>
      )}
    </div>
  )
}

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const [profile, updateProfile] = useState<IProfile>({ ...appStore.profile })
  
  return (
    <div>
      <Field
        label="user name"
        initialValue={profile.name}
        onSubmit={(value) => {
          appStore.updateProfile('name', value)
        }}
      />
      <div>user name: {appStore.profile.name}</div>
      <div>user name: {profile.name}</div>
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

export default observer(Profile)