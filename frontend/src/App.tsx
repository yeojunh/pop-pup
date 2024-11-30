import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './components/auth';
import { db } from './firebase-config';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const SERVER_API_ENDPOINT = import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_ENDPOINT : import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;
  
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);
  
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
    location: Geolocation;
    since: Date;
    image_url: string[];
    compatibility: Map<string, string>;
  }

  const [animalList, setAnimalList] = useState<Animal[]>([]);

  const animalsCollectionRef = collection(db, 'animals');

  // show as soon as the page loads
  useEffect(() => {
    const getAnimalList = async () => {
      try {
        const data = await getDocs(animalsCollectionRef);
        const filteredData = data.docs.map((doc) => {
          const animalData = doc.data();
          return {
            id: animalData.id,
            name: animalData.name,
            description: animalData.description,
            species: animalData.species,
            age: animalData.age,
            weight: animalData.weight,
            colour: animalData.colour,
            breed: animalData.breed,
            sex: animalData.sex,
            location: animalData.location,
            since: animalData.since.toDate(),
            image_url: animalData.image_url,
            compatibility: animalData.compatibility,
          } as Animal;
        });
        setAnimalList(filteredData);
      } catch (err) {
        console.error(err);
      }
    }

    getAnimalList();
  }, []);

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
        {animalList.map((animal) => (
          <div key={animal.id}>
            <h2>Featured Animal</h2>
            <p>Name: {animal.name}</p>
            <p>Description: {animal.description}</p>
          </div>
        ))}
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
