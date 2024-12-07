import { Animal } from "../types/api";
import { initializeAnimal } from "../types/initializers";

const SERVER_API_ENDPOINT = import.meta.env.PROD
? import.meta.env.VITE_PROD_SERVER_ENDPOINT
: import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;

let cats: Animal[] = [initializeAnimal()];

export function getCats() {
  const newCat = initializeAnimal();
  newCat.pet_type = "Cat";
  newCat.name = "Fluffy";
  cats = [newCat];
  return cats;
}

export function getCat(id: string) {
  return cats.find((cat) => cat.id === id);
}

export const fetchAnimal = async (id: string) => {
  try {
    const all = await fetchAnimals(); 
    const animal = all.find((animal) => animal.id === id);
    return animal;
  } catch (err) {
    console.error(err);
  }
};

export const fetchAnimals = async () => {
  try {
    const response = await fetch(
      `${SERVER_API_ENDPOINT}/api/scraper/get_test_animal`,
    );
    const data = await response.json();
    const fetchedAnimal: Animal = {
      id: data.id,
      name: data.name,
      description: data.description,
      pet_type: data.species,
      age: data.age + " years old",
      weight: data.weight,
      colour: data.colour,
      breed: data.breed,
      sex: data.sex,
      location: data.location,
      since: new Date(data.since),
      images: ["https://miro.medium.com/v2/resize:fit:1400/1*rIkmavUeqyRySwlQdA9kKg.jpeg", "https://tr.rbxcdn.com/180DAY-78206173c998f8cbfa385b7a69a56712/420/420/Hat/Webp/noFilter"],
      date_created: new Date(),
      url: data.url,
      compatibility: data.compatibility,
    };
    const fetchedAnimal2: Animal = {
      id: '1002',
      name: "Toby",
      description: "Meet Toby. He's a very friendly dog who loves to play and cuddle. He's looking for a forever home where he can be loved and cared for.",
      pet_type: data.species,
      age: data.age + 2 + " years old",
      weight: data.weight,
      colour: data.colour,
      breed: ["Border Collie", "Labrador Retriever"],
      sex: data.sex,
      location: data.location,
      since: new Date(data.since),
      images: ["https://pbs.twimg.com/media/GJ2vmapXsAEFXdV.jpg", "https://i.pinimg.com/originals/bf/80/33/bf80330a6b4525324e166ae245e1b8a4.png"],
      date_created: new Date(),
      url: data.url,
      compatibility: data.compatibility,
    };

    return [fetchedAnimal, fetchedAnimal2];
  } catch (err) {
    console.error(err);
    return []
  }
};

export const fetchAnimalsTest = async () => {
  // 596074 featured dog
  // 596897 bonded dog
  // 596801 dog 
  // 596537 featured cat

  const ids = [596074, 596897, 596801, 596537];
  const allAnimals = [];

  try {
    for (const id of ids) {
      const response = await fetch(
          `${SERVER_API_ENDPOINT}/api/scraper/get_animal/${id}`,
      );
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
        since: data.since,
        images: data.images,
        date_created: data.date_created,
        url: data.url,
        compatibility: data.compatibility,
      };
      allAnimals.push(fetchedAnimal);
    }
  } catch (err) {
    console.error(err);
  }
  return allAnimals;
}
