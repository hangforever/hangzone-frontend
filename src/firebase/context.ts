import { createContext } from 'react'
import Firebase from './Firebase'

export default createContext(new Firebase());
