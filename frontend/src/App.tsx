import { useState, useEffect } from 'react';
import './tailwind.css';
import { Bento } from './components/layouts/Bento';
import { Animal } from './types/api';
import { initializeAnimal } from './types/initializers';

function App() {
  const SERVER_API_ENDPOINT = import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_ENDPOINT : import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;

  const [animal, setAnimal] = useState<Animal>(initializeAnimal());

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`${SERVER_API_ENDPOINT}/api/scraper/get_test_animal`);
        const data = await response.json();
        const fetchedAnimal: Animal = {
          id: data.id,
          name: data.name,
          description: data.description,
          pet_type: data.species,
          age: data.age,
          weight: data.weight,
          colour: data.colour,
          breed: data.breed,
          sex: data.sex,
          location: data.location,
          since: new Date(data.since),
          images: data.image_url,
          date_created: new Date(),
          url: data.url,
          compatibility: data.compatibility,
        };
        setAnimal(fetchedAnimal);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnimal();
  }, [SERVER_API_ENDPOINT]);

  return (
    <>
      <h1 className='text-5xl m-10 text-center text-garden-lightshade font-serif'>Pop-pup</h1>
      <p className='text-center text-garden-lightshade font-thin'>The browser extension for daily *adoptable* animal photos</p>
      <Bento recommendations={animal.name} />
    </>
  )
}

export default App
