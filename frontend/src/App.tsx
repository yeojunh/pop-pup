import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Auth } from './components/auth';

function App() {
  const SERVER_API_ENDPOINT = import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_ENDPOINT : import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;

  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [animal, setAnimal] = useState<Animal | null>(null);

  interface Animal {
    id: string;
    name: string;
    description: string;
    species: string;
    age: number;
    weight: number;
    colour: string[];
    breed: string[];
    sex: string;
    location: string;
    since: Date;
    images: string[];
    compatibility: Map<string, string>;
  }

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`${SERVER_API_ENDPOINT}/api/scraper/get_test_animal`);
        const data = await response.json();
        const fetchedAnimal: Animal = {
          id: data.id,
          name: data.name,
          description: data.description,
          species: data.species,
          age: data.age,
          weight: data.weight,
          colour: data.colour,
          breed: data.breed,
          sex: data.sex,
          location: data.location,
          since: new Date(data.since),
          images: data.image_url,
          compatibility: new Map(Object.entries(data.compatibility)),
        };
        setAnimal(fetchedAnimal);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnimal();
  }, [SERVER_API_ENDPOINT]);


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
        {animal && (
          <div>
            <h2>{animal.name}</h2>
            <p>{animal.description}</p>
            {/* Add more fields as needed */}
          </div>
        )}
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
