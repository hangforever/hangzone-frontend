import React from 'react';
import Firebase from './Firebase'

const FirebaseContext = React.createContext<Firebase>({} as Firebase);

export default FirebaseContext;
