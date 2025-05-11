import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Animations from './../../Animations/Animations';
import { Link } from 'react-router-dom';
import { TbLogin2 } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

export default function Register() {

    const {t, i18n} = useTranslation();
    
    // ====== links-data ====== //

    const linksData = [

        {id: 1, icon: <TbLogin2 />, name: 'loginWord', url: '/login', border: true},
        {id: 2, icon: <AiOutlineUserAdd />, name: 'signUpWord', url: '/sign-up'},

    ];

    // ====== display-links ====== //
    
    const [displayLinks, setDisplayLinks] = useState(false);

    const toggleLangsList = () => {

        setDisplayLinks(prev => !prev);

    }

    const LinkListRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (LinkListRef.current && !LinkListRef.current.contains(event.target)) {
            setDisplayLinks(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [handleClickOutside]);

    return <React.Fragment>

        <button ref={LinkListRef} onClick={toggleLangsList} className='
            relative p-2.5 rounded-md bg-[var(--gray-color-3)] text-2xl text-[var(--blue-color)] cursor-pointer
            flex items-center justify-between gap-1 max-[881px]:gap-2.5 max-[881px]:w-full max-[881px]:h-10 
        '>

            <div className='flex items-center gap-2.5'>
                <AiOutlineUser />
                <p className='hidden text-base font-semibold text-[var(--blue-color)] max-[881px]:inline-block'>
                    {t('registerWord')}
                </p>
            </div>

            <div className={` duration-300 text-xl ${displayLinks ? i18n.language === 'en' ? 'rotate-90' : '-rotate-90' : ''}`}>
                {i18n.language === 'en' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>

            <AnimatePresence>

                {displayLinks && <motion.ul 
                    variants={Animations.displayList} 
                    initial='hidden' animate='visible' exit={'exit'}
                    className={`
                        min-w-full absolute start-0 top-mixed-110 rounded-md bg-[var(--gray-color-3)] overflow-hidden
                    `}
                >

                    {linksData.map(link => 
                        <Link to={link.url} key={link.id}>
                            <li 
                                className={`
                                    p-2.5 flex items-center gap-2.5 cursor-pointer duration-300 
                                    text-[var(--gray-color-2)] hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)]
                                    dark:hover:text-[var(--black-color-2)]
                                    ${link.border ? `border-b border-[var(--gray-color-1)]` : ''}
                                `}
                            >
                                <div className='text-2xl'>
                                    {link.icon}
                                </div>
                                <p className='text-base font-medium whitespace-nowrap'>{t(link.name)}</p>
                            </li>
                        </Link>
                    )}

                </motion.ul>}

            </AnimatePresence>

        </button>

    </React.Fragment>

}
