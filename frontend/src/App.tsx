import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './components/auth';

function App() {
  const SERVER_API_ENDPOINT = import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_ENDPOINT : import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;
  
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch(`${SERVER_API_ENDPOINT}/time`).then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Auth />
        <p>The current time is {currentTime}.</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
