import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineTranslate } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Animations from './../../Animations/Animations';
import Flag from 'react-world-flags';

export default function TrButton({staySmall, handleNavToggle}) {

    const {t, i18n} = useTranslation();

    // ====== languages-data ====== //

    const languagesData = [

        {id: 1, name: 'enWord', code: 'us', lang: 'en'},
        {id: 2, name: 'arWord', code: 'eg', lang: 'ar'},

    ];

    // ====== display-langs ====== //

    const [displayLangs, setDisplayLangs] = useState(false);

    const toggleLangsList = () => {

        setDisplayLangs(prev => !prev);

    }

    const langListRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (langListRef.current && !langListRef.current.contains(event.target)) {
            setDisplayLangs(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== change-language ====== //

    const changeLanguage = (lang) => {

        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        staySmall ? '' : handleNavToggle();

        setTimeout(() => {
            setDisplayLangs(false);
        }, 0); 

    };

    return <React.Fragment>

        <button ref={langListRef} onClick={toggleLangsList} className={`
            relative p-2.5 rounded-md bg-[var(--gray-color-3)] text-2xl text-[var(--blue-color)] cursor-pointer
            flex items-center justify-between gap-1 ${!staySmall ? 'max-[881px]:gap-2.5 max-[881px]:w-full' : ''}
        `}>

            <div className='flex items-center gap-2.5'>
                <HiOutlineTranslate />
                {!staySmall && 
                    <p className='hidden text-base font-medium text-[var(--blue-color)] max-[881px]:block'>{t('languageWord')}</p>
                }
            </div>

            <div className={` duration-300 text-xl ${displayLangs ? i18n.language === 'en' ? 'rotate-90' : '-rotate-90' : ''}`}>
                {i18n.language === 'en' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>

            <AnimatePresence>

                {displayLangs && <motion.ul 
                    variants={Animations.displayList} 
                    initial='hidden' animate='visible' exit={'exit'}
                    className={`
                        absolute min-w-full start-0 top-mixed-110 rounded-md bg-[var(--gray-color-3)] overflow-hidden
                        shadow-[0_0px_10px_var(--black-opacity-color)] z-50
                    `}
                >

                    {languagesData.map(lang => <li 
                        key={lang.id} 
                        onClick={() => changeLanguage(lang.lang)}
                        className={`
                            p-2.5 flex items-center gap-2.5 cursor-pointer duration-300 
                            text-[var(--gray-color-2)] hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)]
                            dark:hover:text-[var(--black-color-2)]
                            last:border-none border-b-[1px] border-[var(--gray-color-3)]
                            ${i18n.language === lang.lang ? 
                                'bg-[var(--blue-color)] text-[var(--salt-color)] dark:text-[var(--black-color-2)]' : ''
                            }
                        `}
                    >
                        <div className="flex items-center justify-center w-7">
                            <Flag className='w-full' code={lang.code} />
                        </div>
                        <p className='text-base font-medium'>{t(lang.name)}</p>
                    </li>)}

                </motion.ul>}

            </AnimatePresence>

        </button>

    </React.Fragment>

}
