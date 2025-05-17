import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Title from './../../Components/Title/Title';
import Table from '../../Components/Table/Table';
import warningSVG from '../../Assets/JSON/warning.json';
import WarnPopUp from './../../Components/Pop-Up/WarnPopUp';
import { Axios, getAllEvents } from '../../API/Api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';
import { IoBanSharp } from 'react-icons/io5';
import PaginationList from '../../Components/Pagination-List/PaginationList';
import { AnimatePresence, motion } from 'framer-motion';
import ResponsePage from '../../Components/Status-Page/ResponsePage';
import FullLoading from '../../Components/Loading/FullLoading';
import Animations from '../../Animations/Animations';

export default function AdminPanel() {

    const {t, i18n} = useTranslation();

    // ====== get-all-events-data ====== //

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllEvents}/?page=${currentPage}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["getAllEventsPanel", currentPage], 
        queryFn: getApiData, keepPreviousData: true,
    });

    // ====== delete-event-pop-up ====== //

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const deleteEvent = (id) => {
        return Axios.delete(`${getAllEvents}/${id}`)
    }

    const queryClient = useQueryClient();
    const { mutate: deleteEventMutate, isPending: deleteIsLoading } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(["getAllEventsPanel", currentPage]);
            setSuccessMessage('eventDeletedSuccessMsg');
        },
        onError: (error) => {
            console.error('Error deleting event:', error.message);
            setErrorMessage('failedDeleteEventMsg');
        },
    });

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleConfirmBan = () => {

        if (selectedEvent) {

            try {

                deleteEventMutate(selectedEvent._id);

            } catch (error) {
                console.error(error);
            } finally {
                setIsModalOpen(false);
                setSelectedEvent(null);
            }

        }

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    useEffect(() => {

        if (successMessage || errorMessage) {

            const timer = setTimeout(() => {
                setSuccessMessage(null);
                setErrorMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }

    }, [successMessage, errorMessage]);

    return <React.Fragment>

        <AnimatePresence>
            {successMessage && <ResponsePage type={true} msg={successMessage} />}
            {errorMessage && <ResponsePage type={false} msg={errorMessage} />}
            {deleteIsLoading && <FullLoading />}
        </AnimatePresence>

        <WarnPopUp isOpen={isModalOpen}
            isRed={true}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('deleteEventTitle')}
            message={t('deleteEventMessage')}
        />

        <AnimatePresence mode='wait'>
            <motion.section
                variants={Animations.addAnimationToChildOnlyVariants} key={currentPage}
                initial='hidden' animate={'visible'}
                className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10 overflow-hidden'
            >

                <motion.div
                    variants={Animations.addAnimationToChildOnlyVariants}
                    className='w-full flex items-center justify-between flex-wrap gap-5'
                >

                    <motion.div variants={Animations.toRightVariants}><Title title={'eventsManagementWord'} /></motion.div>

                    <motion.div variants={Animations.toLeftVariants}>
                        <Link to={'add-event'} className='
                            px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                            text-base text-[var(--salt-color)] dark:text-[var(--black-color-2)] font-medium cursor-pointer
                        '>
                            <IoIosAddCircleOutline className='text-xl' />
                            <p>{t('addEventWord')}</p>
                        </Link>
                    </motion.div>

                </motion.div>

                <motion.div variants={Animations.scaleVariants} className='
                    w-full rounded-md bg-[var(--salt-color)] shadow-[0_0px_10px_var(--light-black-opacity-color)] 
                    border border-solid border-[var(--gray-color-3)] overflow-x-auto hidden_scroll
                '>

                    <Table data={data?.events} 
                        columns={['eventWord', 'dateWord', 'locationWord', 'viewEventsWord']}
                        actions={true} emptyMessage="noEventsYet" emptyIcon={warningSVG}
                        isLoading={isLoading} isError={isError}
                        renderRow={(event) => (

                            <React.Fragment>

                                <td className='p-2.5 whitespace-nowrap'>{event.name}</td>

                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>{event.date.split('T')[0]}</td>

                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>{event.location}</td>

                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>
                                    <Link 
                                        to={`/events/single-event/${event._id}`}
                                        className='flex items-center justify-center gap-1 cursor-pointer text-[var(--blue-color)]'
                                    >
                                        <p>{t('viewEventWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </Link>
                                </td>

                            </React.Fragment>

                        )}
                        onActionClick={(event) => (

                            <div className='flex items-center justify-center gap-2.5'>

                                <Link to={`update-event-data/${event._id}`} className='
                                    p-2.5 rounded-md bg-[var(--gray-color-3)]
                                    text-[var(--blue-color)] cursor-pointer duration-300
                                    hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)]
                                    dark:hover:text-[var(--black-color-2)]
                                '><FiEdit /></Link>

                                <button 
                                    onClick={() => handleDeleteClick(event)}
                                    className='
                                        p-2.5 rounded-md bg-[var(--gray-color-3)]
                                        text-[var(--red-color)] cursor-pointer duration-300
                                        hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                        dark:hover:text-[var(--black-color-2)]
                                '><IoBanSharp /></button>

                            </div>

                        )}
                    />

                </motion.div>

                <PaginationList data={data?.pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            </motion.section>
        </AnimatePresence>

    </React.Fragment>

}
