import { useState, useEffect } from 'react';
import './tailwind.css';
import { Auth } from './components/auth';
import { Bento } from './components/Bento';
import NoiseFilter from './components/NoiseFilter';

function App() {
  const SERVER_API_ENDPOINT = import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_ENDPOINT : import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;

  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [animal, setAnimal] = useState<Animal>(
    {
      id: "",
      name: "",
      description: "",
      species: "",
      age: 0,
      weight: 0,
      colour: [],
      breed: [],
      sex: "", 
      location: "",
      since: new Date(),
      images: [],
      compatibility: new Map(),
    }
  );

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
      <h1 className='text-5xl m-10'>Pop-pup</h1>
      <p>The browser extension for daily *adoptable* animal photos</p>
      <Bento recommendations={animal.name} />
    </>
  )
}

export default App
