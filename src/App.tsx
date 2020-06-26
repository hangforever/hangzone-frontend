import React from 'react';
import sample from './sample.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <h1>Hangzonessss</h1>
        <div className="pika">
          <p>Image example using path</p>
          <img src="/images/pikawho.png" alt=""/>
        </div>
        <div className="sample">
          <p>Image example using import</p>
          <img src={sample} alt=""/>
        </div>
        <div className="farts">
          <p>Now we're cookin with farts - Scott 2020 at the age of a single Willennium<br /><img src="https://upload.wikimedia.org/wikipedia/en/c/c1/WillSmith-Willennium.jpg" /></p>
        </div>
      </div>
    </div>
  );
}

export default App;
