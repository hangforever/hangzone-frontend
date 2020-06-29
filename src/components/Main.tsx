import React from 'react'
import sample from '../sample.png'

// This is just a fake route that can be deleted whenever
// it's just to demonstrate routing
export default function Main() {
  return (
    <div className="Main">
      <h1>Hangzonessss</h1>
      <div className="pika">
        <p>Image example using path</p>
        <img src="/images/pikawho.png" alt="" />
      </div>
      <div className="sample">
        <p>Image example using import</p>
        <img src={sample} alt="" />
      </div>
      <div className="farts">
        <p>Now we're cookin with farts - Scott 2020 at the age of a single Willennium<br /><img src="https://upload.wikimedia.org/wikipedia/en/c/c1/WillSmith-Willennium.jpg" /></p>
      </div>
    </div>
  )
}
