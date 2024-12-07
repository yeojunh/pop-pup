import { Link } from "react-router-dom";
import { Animal, Compatibility } from "../../types/api";
import { CompatibilityYesConverter, CompatibilityNoConverter } from "../../types/converters";

const Card = (animalInfo: Animal) => {
  return (
    <div className="bg-garden-lightshade p-4 m-4 w-fit rounded-md font-thin">
      <HighlightedTag compatibility={animalInfo.compatibility} />
      <Favourite />
      <Link to={`/pets/${animalInfo.id}`}>
        <Image images={animalInfo.images} /> 
      </Link>
      <Details animalInfo={animalInfo} /> 
      <Tags animalInfo={animalInfo} />
    </div>
  )
};

const HighlightedTag = ({ compatibility }: { compatibility: Compatibility }) => {
  return (
    <Tag item=
      {
        compatibility.featured_pet === "Yes" ? "Featured pet" : 
        compatibility.staff_pick === "Yes" ? "Staff pick" :
        compatibility.adoption_pending === "Yes" ? "Adoption Pending" : 
        // compatibility.bonded === "Yes" ? "Bonded" : 
        compatibility.special_needs === "Yes" ? "Special needs" : 
        // compatibility.in_foster === "Yes" ? "In foster" : 
        // compatibility.longterm_resident === "Yes" ? "Long term resident" : 
        ""
      }
    />
  )
}

const Favourite = () => {
  return (
    <></>
  );
}

const Image = ({ images }: { images: string[]}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[300px] h-[400px] bg-garden-lightshade rounded-md">
        <img 
          className="absolute inset-0 m-auto max-w-full max-h-full object-contain" 
          src={images[0]} 
          alt=""
        />
      </div>
    </div>
  );
}

const Tags = ({ animalInfo }: { animalInfo: Animal }) => {
  const tags: string[] = [];

  (Object.entries(animalInfo) as [keyof Animal, string][]).forEach(([key, value]: [keyof Animal, string]) => {
    if (typeof key !== "string") return;
    if (key === "compatibility") {
      (Object.entries(animalInfo.compatibility) as [keyof Compatibility, string][]).forEach(([compatibilityKey, compatibilityValue]) => {
        if (compatibilityValue === "Yes" && 
           (compatibilityKey === "ok_with_cats" || 
            compatibilityKey === "ok_with_dogs" || 
            compatibilityKey === "lived_with_kids" || 
            compatibilityKey === "bonded")) {
          tags.push(CompatibilityYesConverter[compatibilityKey]);
        } else if (compatibilityValue === "No" && 
          (compatibilityKey === "ok_with_cats" || 
           compatibilityKey === "ok_with_dogs" || 
           compatibilityKey === "ok_with_livestock" ||
           compatibilityKey === "lived_with_kids" || 
           compatibilityKey === "house_trained")) {
            tags.push(`${CompatibilityNoConverter[compatibilityKey]}`);
        }
      })
    } else if (typeof value === "object") {
      if (key === "colour") {
        tags.push((value as string[]).join(" / "));
      }
    }
  });
  
  return (
    <div className="flex flex-wrap">
      <Tag item={animalInfo.sex} />
      {tags.map((tag: string) => <Tag key={tag} item={tag} />)}
    </div>
  )
}


const Tag = ({ item }: { item: string }) => {
  return (
    <div className="border bg-garden-lightaccent w-fit px-2 m-1 rounded-xl">
      <p>{item}</p>
    </div>
  )
}

const Details = ({ animalInfo }: { animalInfo: Animal }) => {
  return (
    <div>
      <p>{animalInfo.name}</p>
      <div className="flex justify-between">
        <p>{animalInfo.breed.join(" / ")}</p>
        <p>{animalInfo.age}</p>
      </div>
    </div>
  );
}


export { Card };
