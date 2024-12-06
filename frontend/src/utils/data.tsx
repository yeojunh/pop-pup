import { Animal } from "../types/api";
import { initializeAnimal } from "../types/initializers";

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
