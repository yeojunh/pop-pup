import { Animal } from "../../types/api";

const Card = (animalInfo: Animal) => {
    return <>{animalInfo.name}</>;
  };
  
  export { Card };
  