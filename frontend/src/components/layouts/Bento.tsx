import { motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Auth } from '../../features/auth';

export const Bento = ({recommendations}: {recommendations: string}) => {
  return (
    <div className='min-h-screen min-w-full px-4 py-12 text-zinc-100'>
        <motion.div 
            initial="initial"
            animate="animate"
            transition={{staggerChildren: 0.1}}
            className='mx-auto grid max-w-screen-2xl grid-cols-11 gap-4 p-2'
        >
            <RecommendationsBlock recomendations={recommendations} />
            <DogsBlock />
            <CatsBlock />
            <FavouritesBlock />
            <ImageBlock />
            <ContactBlock />
            <OthersBlock />
            <AccountBlock />
        </motion.div>
    </div>
  );
};

type Props = {
    className?: string;
} & MotionProps;

const Block = ({className, ...rest}: Props) => {
    return (
        <motion.div 
            variants={
                {initial: { scale: 0.1, y: 50, opacity: 0}, 
                animate: { scale: 1, y: 0, opacity: 1}}
            }
            whileHover={{
                rotate: "-1deg", 
                scale: 1.08,
            }} 
            transition={{
                type: 'spring',
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={twMerge('col-span-4 rounded-lg p-6 bg-campfire-emerald-default bg-gradient-to-tr from-campfire-emerald-default to-campfire-lime-default', className)}
            {...rest}
        />
    )
}

const RecommendationsBlock = ({recomendations}: {recomendations: string}) => {
    return (
        <>
            <Block className='col-span-6 row-span-2 md:col-span-7'>
                <h1 className='text-2xl font-medium mb-4'>
                    Recommendations
                </h1>
                <div className='flex flex-row mx-8 gap-4 '>
                    <InnerBlock img="https://miro.medium.com/v2/resize:fit:1400/1*rIkmavUeqyRySwlQdA9kKg.jpeg" text={recomendations} />
                    <InnerBlock img="https://pbs.twimg.com/media/GJ2vmapXsAEFXdV.jpg" text="Toby" />
                    <InnerBlock img="https://pbs.twimg.com/media/GJ2vmapXsAEFXdV.jpg" text="See more" />
                </div>
            </Block>
        </>
    )
}

const InnerBlock = ({img, text}: {img: string, text?: string}) => {
    return (
        <Block className='bg-gradient-to-tr from-campfire-lime-dark to-campfire-lime-light'>            
            <img className='w-20' src={img} />
            <p>{text}</p>
        </Block>
    )
}

const DogsBlock = () => {
    return (
        <Block className='col-span-2 row-span-2'>
            <h1 className='text-2xl font-medium mb-4'>
                Dogs
            </h1>
            <img src="https://tr.rbxcdn.com/180DAY-78206173c998f8cbfa385b7a69a56712/420/420/Hat/Webp/noFilter" />
        </Block>
    )
}

const CatsBlock = () => {
    return (
        <Block className='col-span-2 row-span-2'>
            <h1 className='text-2xl font-medium mb-4'>
                Cats
            </h1>
            <img src="https://i.pinimg.com/originals/bf/80/33/bf80330a6b4525324e166ae245e1b8a4.png" />
        </Block>
    )
}

const OthersBlock = () => {
    return (
        <Block className='col-span-5 row-span-2'>
            <h1 className='text-2xl font-medium mb-4'>
                See more animals
            </h1>
            <div className='flex flex-row gap-4'> 
                <InnerBlock img="https://ih1.redbubble.net/image.4085943093.7745/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" text='rabbits, birds & small animals' />
                <InnerBlock img="https://external-preview.redd.it/eTZ1DzYyLfPJFvko0tKd47Q6EedCQz7UFnROPDk9KpI.jpg?width=640&crop=smart&auto=webp&s=f56de1ffd5e5451ee64a0c1258e4d5e6f22e86fe" text='farm & stable animals' />
                <InnerBlock img="https://i.imgflip.com/3mha0a.jpg?a481416" text='reptiles, fish & invertebrates'/>
            </div>
        </Block>
    )
}

const FavouritesBlock = () => {
    return (
        <Block className='col-span-2'>
            <p className='text-2xl font-sm mb-4'>
                Favourites
            </p>
        </Block>
    )
}

const AccountBlock = () => {
    return (
        <Block className='col-span-2'>
            <p className='text-2xl font-sm mb-4'>
                Account
            </p>
            <Auth />
        </Block>
    )
}

const ImageBlock = () => {
    return (
        <Block className='col-span-2 row-span-2'>
            <p className='text-xl font-medium mb-4'>
                Insert image here
            </p>
        </Block>
    )
}

const ContactBlock = () => {
    return (
        <Block className='col-span-2 row-span-2'>
            <p className='text-xl font-medium mb-4 hover:underline'>
                Get in touch
            </p>
        </Block>
    )
}