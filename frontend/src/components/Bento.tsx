import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { FiArrowRight } from 'react-icons/fi';
import { SiYoutube } from 'react-icons/si';

export const Bento = () => {
  return (
    <div className='min-h-fit bg-zinc-900 px-4 py-12 text-zinc-50'>
        <motion.div 
            initial="initial"
            animate="animate"
            transition={{staggerChildren: 0.1}}
            className='mx-auto grid max-w-4xl grid-cols-12 gap-4 p-2'
        >
            <HeaderBlock />
            <SocialsBlock />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />

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
            transition={{
                type: 'spring',
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={twMerge('col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6', className)}
            {...rest}
        />
    )
}

const HeaderBlock = () => {
    return (
        <Block className='col-span-12 row-span-2 md:col-span-6'>
            <img />
            <h1 className='mb-12 text-4xl font-medium leading-tight'>
                Hello!{" "}
                <span className='text-zinc-400'>
                    I do this and that. 
                </span>
            </h1>
            <a href='#'
            className='flex items-center gap-1 text-red-300 hover:underline'>
                Get in touch <FiArrowRight />
            </a>
        </Block>
    )
}

const SocialsBlock = () => {
    return <>
        <Block 
            whileHover={{
                rotate: "2.5deg", 
                scale: 1.1,
            }} 
            className='col-span-6 bg-red-500 md:col-span-3'>
            <a href='#' className='grid h-full place-content-center text-3xl text-white'>
                <SiYoutube />
            </a>
        </Block>
        <Block 
            whileHover={{
                rotate: "-2.5deg", 
                scale: 1.1,
            }} 
            className='col-span-6 bg-red-500 md:col-span-3'>
            <a href='#' className='grid h-full place-content-center text-3xl text-white'>
                <SiYoutube />
            </a>
        </Block>
        <Block 
            whileHover={{
                rotate: "-2.5deg", 
                scale: 1.1,
            }} 
            className='col-span-6 bg-red-500 md:col-span-3'>
            <a href='#' className='grid h-full place-content-center text-3xl text-white'>
                <SiYoutube />
            </a>
        </Block>
        <Block 
            whileHover={{
                rotate: "2.5deg", 
                scale: 1.1,
            }} 
            className='col-span-6 bg-red-500 md:col-span-3'>
            <a href='#' className='grid h-full place-content-center text-3xl text-white'>
                <SiYoutube />
            </a>
        </Block>
    </>
}
