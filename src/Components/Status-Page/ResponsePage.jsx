import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { PropTypes } from 'prop-types';
import Animations from '../../Animations/Animations';

import errorIcon from '../../Assets/JSON/wrong.json';
import successIcon from '../../Assets/JSON/true.json';

export default function ResponsePage({type, msg}) {

    return <React.Fragment>

        <motion.section variants={Animations.opacityVariantsNoStagger} initial='hidden' animate='visible' exit={'exit'} className='
            common_cont fixed top-0 left-0 w-full h-screen flex items-center justify-center 
            bg-[var(--darker-black-opacity-color)] z-[100]
        '>

            <motion.div 
                variants={Animations.scaleVariants} 
                className='w-115 p-5 flex flex-col items-center rounded-md bg-[var(--salt-color)]'
            >

                <Lottie className='w-28' animationData={type ? successIcon : errorIcon} loop={false} />

                <p 
                    className={`text-xl font-medium ${type ? 'text-[var(--blue-color)]' : 'text-[var(--red-color)]'}`} 
                >{msg}</p>

            </motion.div>

        </motion.section>

    </React.Fragment>

}

ResponsePage.propTypes = {
    type: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
}