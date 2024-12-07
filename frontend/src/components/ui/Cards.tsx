import { Animal } from "../../types/api";
import { Card } from "./card";

interface AnimalsProps {
    animalsInfo: Animal[];
}

const Cards = (animalsInfo: AnimalsProps) => {
  return (
    <div className="flex">
        {animalsInfo.animalsInfo?.map((animalInfo: Animal) => (
          <Card key={animalInfo.id} {...animalInfo} />
          )
        )}
    </div>
  );
};

export default Cards;