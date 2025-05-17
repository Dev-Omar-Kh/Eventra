import React, { useState } from 'react';
import Title from '../../../Components/Title/Title';
import Filter from '../../../Components/Filter-Button/Filter';
import Card from '../../../Components/Event-Card/Card';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Axios, getAllEvents } from '../../../API/Api';
import { useQuery } from '@tanstack/react-query';
import { BiFilterAlt } from 'react-icons/bi';
import warnSVG from '../../../Assets/JSON/warning.json';
import errorSVG from '../../../Assets/JSON/wrong.json';
import LoadingCard from '../../../Components/Event-Card/LoadingCard';
import FullError from '../../../Components/Error/FullError';
import Animations from '../../../Animations/Animations';
import { AnimatePresence, motion } from 'framer-motion';

export default function LatestEvents() {

    const {t} = useTranslation();

    // ====== get-all-events-data ====== //

    const [eventType, setEventType] = useState("allEventsWord");

    const getApiData = async() => {
        const typeQuery = (eventType === "allEventsWord" ? "" : `&type=${eventType}`);
        const {data} = await Axios.get(`${getAllEvents}/?latest=true${typeQuery}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({queryKey: ["getLatestEvents", eventType], queryFn: getApiData});

    const filterData = ['allEventsWord', ...data?.types || []];

    return <React.Fragment>

        <motion.section
            variants={Animations.addAnimationToChildOnlyVariants}
            initial='hidden' whileInView={'visible'} viewport={{once: true}}
            className='w-full py-[3.125rem] p_x flex flex-col gap-10 overflow-hidden'
        >

        <div className='w-full flex flex-wrap items-center justify-between gap-5'>

            <motion.div variants={Animations.toRightVariants}><Title title={'latestEventsWord'} /></motion.div>

            <motion.div variants={Animations.toLeftVariants}>
                <Filter 
                    data={filterData} icon={<BiFilterAlt />} width={'min-w-48'} 
                    currentFilter={eventType} setCurrentFilter={setEventType} 
                />
            </motion.div>

        </div>

        {!isError && isLoading && <div 
            className='w-full grid grid-cols-4 gap-5 max-[1235px]:grid-cols-3 max-[915px]:grid-cols-2 max-[630px]:grid-cols-1'
        >

            {Array.from({length: 4}, (_, idx) => <LoadingCard key={idx} />)}

        </div>}

        {!isError && !isLoading && data && data?.events.length > 0 && <React.Fragment>

            <AnimatePresence mode='wait'>
                <motion.div 
                    variants={Animations.addAnimationToChildOnlyVariants}
                    className='
                        w-full grid grid-cols-4 gap-5 
                        max-[1235px]:grid-cols-3 max-[915px]:grid-cols-2 max-[630px]:grid-cols-1
                    '
                >

                    {data.events.map(card => <motion.div 
                        key={card._id} 
                        variants={Animations.scaleVariants}
                        layout initial='hidden' whileInView='visible' exit={'exit'}
                        viewport={{once: true}}
                    >
                        <Card data={card} />
                    </motion.div>)}

                </motion.div>
            </AnimatePresence>

            <div className='w-full flex justify-end'>
                <Link
                    to={'/events'}
                    className='
                        p-2.5 rounded-md bg-[var(--blue-color)] flex items-center justify-center gap-1 max-[465px]:w-full
                        text-[var(--salt-color)] dark:text-[var(--black-color-2)] duration-300 hover:scale-105
                    '
                >
                    <p>{t('allEventsWord')}</p>
                    <IoIosArrowForward className='text-xl rtl:rotate-180' />
                </Link>
            </div>

        </React.Fragment>}

        {!isError && !isLoading && data && data?.events.length === 0 &&
            <FullError icon={warnSVG} msg={'noEventsYetMessage'} isRed={false} />
        }

        {!isLoading && isError && <FullError icon={errorSVG} msg={'errorFetchMessage'} isRed={true} />}

        </motion.section>

    </React.Fragment>

}
