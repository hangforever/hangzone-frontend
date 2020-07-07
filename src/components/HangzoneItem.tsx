import React from 'react'
import { Hangzone } from '../types'

interface Props extends Hangzone { }

const HangzoneItem: React.SFC<Props> = ({
  id,
  name,
  description,
  isPrivate,
}) => (
    <li>
      ID: {id} <br/>
      Name: {name} <br/>
      Description: {description} <br/>
      Private?: <input type="checkbox" checked={isPrivate} /> <br/>
    </li>
  )

export default HangzoneItem
