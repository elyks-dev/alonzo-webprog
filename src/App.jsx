import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App!</h1>
        <p>
          Name: Kyle Alonzo<br />
          Email: kylealonzo@example.com<br />
          Other Personal Info: I like coding and building web applications!
        </p>

         <p>
          Repository:{" "}
          <a href="https://github.com/elyks-dev/alonzo-webprog" target="_blank" rel="noopener noreferrer">
            https://github.com/elyks-dev/alonzo-webprog
          </a>
        </p>
      </header>
    </div>
  );
}

export default App
