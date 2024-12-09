import { Outlet } from "react-router-dom";
import { fetchAnimalsTest } from "../utils/data";
import Navbar from "../components/ui/Navbar";
import Cards from "../components/ui/Cards";
import { Animal } from "../types/api";
import { useEffect, useState } from "react";
import { PetsProps } from "../types/components";

const Pets = ({ petType }: PetsProps) => {
  const [pets, setPets] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const animal = await fetchAnimalsTest();
      if (animal) {
        setPets(animal);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="bg-garden-darkshade min-h-screen">
      <Navbar />
      <div>
        <h2 className="text-center font-serif text-4xl">{petType === "dog" ? "Dogs" : "Cats"}</h2>
        <nav className="border-r p-4">
          <Cards animalsInfo={pets} />
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Pets;
