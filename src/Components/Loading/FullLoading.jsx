import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function FullLoading() {

    return <React.Fragment>

        <motion.section 
            variants={Animations.opacityVariantsNoStagger} 
            initial='hidden' animate='visible' exit={'exit'} 
            className='
                fixed w-full h-[100dvh] top-0 left-0 bg-[var(--darker-black-opacity-color)] 
                z-50 flex items-center justify-center
            '
        >

        <div className="flex-col gap-4 w-full flex items-center justify-center">

            <div
                className="
                    w-20 h-20 border-6 border-transparent text-[var(--blue-color)] 
                    animate-spin flex items-center justify-center border-t-[var(--blue-color)] rounded-full
                "
            >
                <div
                    className="
                        w-16 h-16 border-6 border-transparent 
                        text-[var(--salt-color)] dark:text-[var(--black-color-2)]
                        text-2xl animate-spin flex items-center justify-center 
                        border-t-[var(--salt-color)] dark:border-t-[var(--black-color-2)] rounded-full
                    "
                ></div>
            </div>

        </div>


        </motion.section>

    </React.Fragment>

}
