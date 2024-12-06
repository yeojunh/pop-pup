import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { Animal, Recommendation } from "../../types/api";
import { initializeAnimal } from "../../types/initializers";
import { Link } from "react-router-dom";

export const BentoGrid = () => {
  const SERVER_API_ENDPOINT = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_SERVER_ENDPOINT
    : import.meta.env.VITE_LOCAL_SERVER_ENDPOINT;

  const [animal, setAnimal] = useState<Animal>(initializeAnimal());

  useEffect(() => {
    const fetchAnimal = async () => {
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
    <div className="min-h-screen min-w-full px-4 py-12 text-garden-main">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto grid max-w-screen-2xl grid-cols-11 gap-4 p-2"
      >
        <RecommendationsBlock recomendations={[animal]} />
        <DogsBlock />
        <CatsBlock />
        <AccountBlock />
        <FavouritesBlock />
        <ImageBlock />
        <OthersBlock />
        <ContactBlock />
      </motion.div>
    </div>
  );
};

type Props = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: Props) => {
  return (
    <motion.div
      variants={{
        initial: { scale: 0.1, y: 50, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
      }}
      whileHover={{
        rotate: "-1deg",
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg p-6 bg-garden-lightshade drop-shadow-md text-garden-darkshade text-center",
        className,
      )}
      {...rest}
    />
  );
};

const RecommendationsBlock = ({
  recomendations,
}: {
  recomendations: Recommendation[];
}) => {
  return (
    <>
      <Block className="col-span-6 row-span-2 md:col-span-7">
        <h1 className="text-2xl font-medium mb-4">Picked for you</h1>
        <div className="flex flex-row mx-8 gap-4 justify-center">
          <InnerBlock
            img="https://miro.medium.com/v2/resize:fit:1400/1*rIkmavUeqyRySwlQdA9kKg.jpeg"
            text={recomendations[0].name}
            link={`recommendations/${recomendations[0].id}`}
          />
          <InnerBlock
            img="https://pbs.twimg.com/media/GJ2vmapXsAEFXdV.jpg"
            text="Toby"
            link={`recommendations/${recomendations[1]?.id}`}
          />
          <InnerBlock
            img="https://pbs.twimg.com/media/GJ2vmapXsAEFXdV.jpg"
            text="See more ->"
            link={"recommendations"}
          />
        </div>
      </Block>
    </>
  );
};

const InnerBlock = ({
  img,
  text,
  link,
}: {
  img: string;
  text?: string;
  link: string;
}) => {
  return (
    <Block className="bg-garden-evendarkershade drop-shadow-md shadow-garden-evendarkershade text-garden-lightaccent font-bold">
      <Link to={link}>
        <img className="w-40" src={img} />
        <p>{text}</p>
      </Link>
    </Block>
  );
};

const DogsBlock = () => {
  return (
    <Block className="col-span-2 row-span-2">
      <Link to="dogs" className="block h-full w-full">
        <h1 className="text-2xl font-medium mb-4">Dogs</h1>
        <img src="https://tr.rbxcdn.com/180DAY-78206173c998f8cbfa385b7a69a56712/420/420/Hat/Webp/noFilter" />
      </Link>
    </Block>
  );
};

const CatsBlock = () => {
  return (
    <Block className="col-span-2 row-span-2">
      <Link to="cats" className="block h-full w-full">
        <h1 className="text-2xl font-medium mb-4">Cats</h1>
        <img src="https://i.pinimg.com/originals/bf/80/33/bf80330a6b4525324e166ae245e1b8a4.png" />
      </Link>
    </Block>
  );
};

const OthersBlock = () => {
  return (
    <Block className="col-span-5 row-span-2">
      <h1 className="text-2xl font-medium mb-4">See more animals</h1>
      <div className="flex flex-row gap-4 justify-center">
        <InnerBlock
          img="https://ih1.redbubble.net/image.4085943093.7745/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
          text="rabbits, birds & small animals"
          link="small-animals"
        />
        <InnerBlock
          img="https://external-preview.redd.it/eTZ1DzYyLfPJFvko0tKd47Q6EedCQz7UFnROPDk9KpI.jpg?width=640&crop=smart&auto=webp&s=f56de1ffd5e5451ee64a0c1258e4d5e6f22e86fe"
          text="farm & stable animals"
          link="farm-and-stable-animals"
        />
        <InnerBlock
          img="https://i.imgflip.com/3mha0a.jpg?a481416"
          text="reptiles, fish & invertebrates"
          link="reptiles-fish-and-invertebrates"
        />
      </div>
    </Block>
  );
};

const ContactBlock = () => {
  return (
    <Block className="col-span-2">
      <p className="text-2xl font-sm mb-4">Get in touch</p>
    </Block>
  );
};

const AccountBlock = () => {
  return (
    <Block className="col-span-2">
      <p className="text-2xl font-sm mb-4">Account</p>
    </Block>
  );
};

const ImageBlock = () => {
  return (
    <Block className="col-span-2 row-span-2">
      <p className="text-xl font-medium mb-4">Insert image here</p>
    </Block>
  );
};

const FavouritesBlock = () => {
  return (
    <Block className="col-span-2 row-span-2">
      <p className="text-xl font-medium mb-4 hover:underline">Favourites</p>
    </Block>
  );
};
