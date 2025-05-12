import React from 'react';
import DmButton from '../Components/Dark-Mode/DmButton';
import TrButton from '../Components/Translate/TrButton';
import { useTranslation } from 'react-i18next';

import authBg from '../Assets/Images/auth-bg.jpg';
import { motion } from 'framer-motion';
import Animations from '../Animations/Animations';
import Logo from '../Components/Logo/Logo';


export default function AuthContainer({children}) {

    const {i18n} = useTranslation();

    return <React.Fragment>

        <section className='w-full min-h-screen overlay bg-cover bg-center' style={{backgroundImage: `url(${authBg})`}}>

            <div className='
                w-full min-h-screen py-[3.125rem] pt-20 p_x flex flex-col gap-5 items-center justify-center 
                bg-[var(--blue-opacity-color)] dark:bg-[var(--dark-salt-opacity-color)]
            '>

                <div className='fixed end-[4.5%] top-5 w-full flex  items-center justify-end flex-wrap gap-2.5'>

                    <TrButton staySmall={true} />

                    <DmButton staySmall={true} />

                </div>

                <motion.div  
                    variants={Animations.scaleVariants}
                    initial='hidden' animate='visible'
                    key={window.location.href}
                    className='
                        w-4xl max-w-full py-5 px-5 max-[800px]:px-[4.5%] flex items-center bg-[var(--salt-color)] 
                        dark:bg-[var(--gray-color-3)] rounded-md max-[800px]:flex-col max-[800px]:gap-5
                    '
                >

                    <div className={`
                        w-2/5 flex items-center justify-center max-[800px]:hidden
                        ${i18n.language === 'en' ? ' pr-5' : 'pl-5'}
                    `}>
                        <Logo width={'max-w-full'} height={'h-24 object-cover'} />
                    </div>

                    {/* add-form */}

                    {children}

                </motion.div>

            </div>

        </section>

    </React.Fragment>

}
