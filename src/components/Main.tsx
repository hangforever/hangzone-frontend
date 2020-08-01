import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import appStoreContext from '../stores/appStoreContext'

// This is just a fake route that can be deleted whenever
// it's just to demonstrate routing
function Main() {
  const appStore = useContext(appStoreContext)
  const [newWord, updateNewWord] = useState(appStore.wordOfTheDay)
  return (
    <div className="Main">
      <h1>Hangzonessss</h1>
      
      <div>
        <h2>The word of the day is</h2>
        <h3>{appStore.wordOfTheDay}</h3>

        <div>But hey, you could always change it...</div>
        <form onSubmit={e => {
          e.preventDefault()
          appStore.setWordOfTheDay(newWord)
        }}>
          <input type="text" value={newWord} onChange={e => updateNewWord(e.target.value)} />
        </form>
      </div>
      <div className="farts">
        <p>Now we're cookin with farts - Scott 2020 at the age of a single Willennium<br /><img src="https://upload.wikimedia.org/wikipedia/en/c/c1/WillSmith-Willennium.jpg" /></p>
      </div>
    </div>
  )
}

export default observer(Main)
