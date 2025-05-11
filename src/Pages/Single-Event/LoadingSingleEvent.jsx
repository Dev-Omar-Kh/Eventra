import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function LoadingSingleEvent() {

    return <React.Fragment>

        <motion.section 
            variants={Animations.parentVariantsNoStagger} initial='hidden' animate='visible' 
            className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'
        >

            <motion.div variants={Animations.loadingVariants} className='w-full h-112 rounded-md bg-[var(--gray-color)]'>
            </motion.div>

            <motion.div 
                variants={Animations.loadingVariants} 
                className='grid grid-cols-10 gap-5 max-[965px]:grid-cols-11 max-[840px]:grid-cols-1'
            >

                <div className='col-span-7 flex flex-col gap-5 max-[840px]:col-span-1'>

                    <div className='w-1/2 h-10 rounded-4xl bg-[var(--gray-color)]'></div>

                    <div className='flex flex-wrap items-center gap-5'>

                        {Array.from({length: 3}, (_, idx) => <div key={idx} className='h-5 w-44 rounded-4xl bg-[var(--gray-color)]'></div>)}

                    </div>

                    <div className='flex flex-col gap-2'>
                        {Array.from({length: 3}, (_, idx) => <div key={idx} className='h-4 w-full rounded-4xl bg-[var(--gray-color)]'></div>)}
                    </div>

                    <div className='w-full h-52 rounded-md bg-[var(--gray-color)]'></div>

                    <div className='h-4 w-4/5 rounded-4xl bg-[var(--gray-color)]'></div>

                </div>

                <div className='col-span-3 max-[965px]:col-span-4 max-[840px]:col-span-1'>

                    <div className='w-full h-48 rounded-md bg-[var(--gray-color)]'></div>

                </div>

            </motion.div>

        </motion.section>

    </React.Fragment>

}
