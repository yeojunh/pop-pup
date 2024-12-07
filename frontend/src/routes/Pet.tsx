import { useParams } from "react-router-dom";
import { fetchAnimal } from "../utils/data";
import { useEffect, useState } from "react";
import { Animal } from "../types/api";

const Pet = () => {
  const { id } = useParams(); 
  const [pet, setPet] = useState<Animal | null>(null); 

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      const cat = await fetchAnimal(id); 
      setPet(cat || null);
    };
    fetchPet();
  }, [id]);

  return (
    <div>
      <h2>Pet</h2>
      <p>{pet?.id}</p>
      <p>{pet?.name}</p>
      <p>{pet?.breed}</p>
      <p>{pet?.colour}</p>
      <p>{pet?.description}</p>
    </div>
  )
}

export default Pet;
