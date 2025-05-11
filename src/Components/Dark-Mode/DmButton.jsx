import React, { useEffect, useState } from 'react';
import { LuCloudMoon, LuCloudSun } from 'react-icons/lu';
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import { useTranslation } from 'react-i18next';

export default function DmButton({staySmall}) {

    const {t} = useTranslation();

    const [toggleDarkMode, setToggleDarkMode] = useState(false);

    useEffect(() => {
        const darkMode = localStorage.getItem('dark-mode') === 'enabled';
        setToggleDarkMode(darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
    }, []);

    const handleToggleDarkMode = () => {
        setToggleDarkMode(prev => !prev);
        document.documentElement.classList.toggle('dark', !toggleDarkMode);
        localStorage.setItem('dark-mode', !toggleDarkMode ? 'enabled' : 'disabled');
    }

    return <React.Fragment>

        <button 
            onClick={handleToggleDarkMode}
            className={`
                p-2.5 rounded-md bg-[var(--gray-color-3)] text-2xl text-[var(--blue-color)] 
                cursor-pointer ${!staySmall ? 'max-[881px]:w-full' : ''}
            `}
        >
            {toggleDarkMode ? 
                <motion.div 
                    key={'sun'} 
                    variants={Animations.opacityVariants} 
                    initial='hidden' animate='visible' 
                    className='flex items-center justify-center gap-2.5'
                >
                    <LuCloudSun /> 
                    {!staySmall &&
                        <p className='hidden text-base font-medium text-[var(--blue-color)] max-[881px]:block'>{t('lightMode')}</p>
                    }
                </motion.div>
                : <motion.div 
                    key={'moon'} 
                    variants={Animations.opacityVariants} 
                    initial='hidden' animate='visible' 
                    className='flex items-center justify-center gap-2.5'
                >
                    <LuCloudMoon />
                    {!staySmall &&
                        <p className='hidden text-base font-medium text-[var(--blue-color)] max-[881px]:block'>{t('darkMode')}</p>
                    }
                </motion.div>
            }
        </button>

    </React.Fragment>

}
