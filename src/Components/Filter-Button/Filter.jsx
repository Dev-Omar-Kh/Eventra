import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiFilterAlt } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function Filter() {

    const {t} = useTranslation();

    const filtersTypes = [
        'conferencesWord',
        'showsPerformancesWord',
        'exhibitionsWord',
        'festivalsWord',
        'coursesWorkshopsWord',
        'musicConcertsWord',
    ];

    // ====== handle-outside-click ====== //

    const [displayList, setDisplayList] = useState(false);
    const [selectedType, setSelectedType] = useState('allEventsWord');
    const ulRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (ulRef.current && !ulRef.current.contains(event.target)) {
            setDisplayList(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== handle-select ====== //

    const handleSelectType = (type) => {

        // setFilterKey(type);
        setSelectedType(type);
        setDisplayList(false);

    }

    return <React.Fragment>

        <div ref={ulRef} className='relative max-[560px]:w-full'>

            <button
                onClick={() => setDisplayList(prev => !prev)} 
                className='
                    min-w-48 max-[560px]:min-w-full p-2.5 rounded-md bg-[var(--gray-color-3)] 
                    flex items-center justify-between gap-2.5 cursor-pointer
                '
            >

                <div className='p-1 rounded-md text-2xl text-[var(--blue-color)] bg-[var(--gray-color-1)]'><BiFilterAlt /></div>

                <p className='text-base font-medium text-[var(--black-color-2)]'>{t(selectedType)}</p>

                <div className={`duration-300 ${displayList ? 'rotate-90 rtl:-rotate-90' : ''}`}>
                    <IoIosArrowForward className='text-2xl rtl:rotate-180 text-[var(--blue-color)]' />
                </div>

            </button>

            <AnimatePresence>

                {displayList && <div 
                    className='
                        absolute start-0 top-mixed-110 w-full max-h-80 overflow-hidden rounded-md 
                        shadow-[0_0px_10px_var(--black-opacity-color)]
                    '
                >

                    <motion.ul 
                        variants={Animations.displayList} 
                        initial='hidden' animate='visible' exit={'exit'}
                        className={`max-h-80 bg-[var(--gray-color-3)] overflow-auto custom-scroll`}
                    >

                        {filtersTypes.map(cate => <li 
                            key={cate}
                            onClick={() => handleSelectType(cate)}
                            className={`
                                p-2.5 flex items-center justify-center cursor-pointer duration-300 
                                dark:hover:text-[var(--black-color-2)]
                                text-[var(--gray-color-2)] hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)]
                                last:border-none border-b border-[var(--gray-color-1)] text-center
                                ${selectedType === cate ? 
                                    'bg-[var(--blue-color)] text-[var(--salt-color)] dark:text-[var(--black-color-2)]': ''
                                }
                            `}
                        >{t(cate)}</li>)}

                    </motion.ul>

                </div>}

            </AnimatePresence>

        </div>

    </React.Fragment>

}
