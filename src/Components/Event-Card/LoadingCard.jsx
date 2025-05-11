import React from 'react'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import Animations from '../../Animations/Animations'
import { motion } from 'framer-motion';

export default function LoadingCard() {

    return <React.Fragment>

        <motion.div 
            variants={Animations.parentVariantsNoStagger} initial='hidden' animate='visible' 
            className='rounded-md overflow-hidden bg-[var(--gray-color-3)] flex flex-col gap-2.5'
        >

            <motion.div variants={Animations.loadingVariants} className='w-full h-56 bg-[var(--gray-color)]'></motion.div>

            <motion.div variants={Animations.loadingVariants} className='p-2.5 flex flex-col gap-2.5'>

                <div className='w-3/4 h-8 bg-[var(--gray-color)] rounded-4xl'></div>

                <div className='w-2/3 h-5 bg-[var(--gray-color)] rounded-4xl'></div>

                <div className='flex items-center justify-between gap-2.5'>

                    <div className='w-20 h-6 bg-[var(--gray-color)] rounded-4xl'></div>

                    <button
                        className='
                            p-1.5 rounded-md bg-[var(--gray-color-1)] flex items-center gap-1
                            text-[var(--blue-color)] cursor-pointer
                        '
                    ><MdOutlineBookmarkAdd className='text-2xl' /></button>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
