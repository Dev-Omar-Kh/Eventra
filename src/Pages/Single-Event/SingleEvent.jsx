import React, { useEffect, useState } from 'react';
import { MdChatBubbleOutline, MdEventNote, MdOutlineBookmark, MdOutlineBookmarkAdd, MdOutlineBookmarkRemove, MdOutlineLocationOn, MdOutlineNoFood } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { LuTicket } from 'react-icons/lu';
import { PiChair, PiOfficeChairLight } from 'react-icons/pi';
import LoadingSingleEvent from './LoadingSingleEvent';
import { Axios, getAllEvents } from '../../API/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import errorSVG from '../../Assets/JSON/wrong.json';
import { useDispatch, useSelector } from 'react-redux';
import { bookEventFun, resetBookingState } from '../../redux/bookingSlice';
import { AnimatePresence } from 'framer-motion';
import ResponsePage from '../../Components/Status-Page/ResponsePage';
import FullLoading from '../../Components/Loading/FullLoading';
import { useTranslation } from 'react-i18next';
import OutStockEvent from '../../Components/Event-Card/OutStockEvent';

export default function SingleEvent() {

    const {id} = useParams();
    const {t} = useTranslation();

    // ====== get-one-event-data ====== //
    
    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllEvents}/${id}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({queryKey: ["getSingleEvent", id], queryFn: getApiData});

    const eventData = [
        {id: 1, icon: <MdEventNote />, title: data?.date.split('T')[0]},
        {id: 2, icon: <MdOutlineLocationOn />, title: data?.location},
        {id: 3, icon: <MdChatBubbleOutline />, title: data?.type}
    ];

    const rulesData = [
        {id: 1, icon: <PiChair />, title: 'One seat per reservation'},
        {id: 2, icon: <MdOutlineNoFood />, title: 'Food is not available in the hall.'},
    ];

    // ====== book-event ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, success, error } = useSelector((state) => state.booking);
    const eventId = data?._id;
    const eventLoading = loading[eventId];
    const eventSuccess = success[eventId];
    const eventError = error[eventId];

    const handleBooking = () => {
        dispatch(bookEventFun(eventId));
    };

    useEffect(() => {


        if (eventSuccess) {

            setSuccessMsg('eventBookedSuccessfully');

            setTimeout(() => {
                setSuccessMsg(null);
                dispatch(resetBookingState());
                setTimeout(() => {navigate('/booked-events')}, 300);
            }, 2000);

        }

        if (eventError) {

            const axiosErrorMessage = eventError.response.data.error;
            console.log(axiosErrorMessage);

            if(axiosErrorMessage === 'Access denied. No token provided.'){

                setErrMsg('authErrorMsg');

                setTimeout(() => {
                    setErrMsg(null)
                    dispatch(resetBookingState());
                    setTimeout(() => {navigate('/booked-events')}, 300);
                }, 2000);

            } else{

                setErrMsg('failedBookEvent');

                setTimeout(() => {
                    setErrMsg(null)
                    dispatch(resetBookingState());
                }, 2000);

            }

        }

    }, [eventSuccess, eventError, dispatch, navigate]);

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <ResponsePage type={true} msg={successMsg} />}
            {errMsg && <ResponsePage type={false} msg={errMsg} />}
            {eventLoading && <FullLoading />}
        </AnimatePresence>

        {!isError && isLoading && <LoadingSingleEvent />}

        {!isError && !isLoading && data && 
            <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'>

                <div className='
                    w-full min-h-60 max-[630px]:min-h-fit rounded-md bg-[var(--gray-color)] border border-[var(--gray-color-3)]
                '>
                    <img 
                        className='w-full max-h-128 max-[630px]:min-h-fit object-cover rounded-md' 
                        src={data.image} alt={`${data.name} Image`} />
                </div>

                <div className='grid grid-cols-10 gap-5 max-[965px]:grid-cols-11 max-[840px]:grid-cols-1'>

                    <div className='col-span-7 flex flex-col gap-5 max-[840px]:col-span-1'>

                        <h3 className='text-3xl font-bold text-[var(--black-color-2)] max-[440px]:text-2xl'>{data.name}</h3>

                        <div className='flex flex-wrap items-center gap-5'>

                            {eventData.map(card => (
                                <div 
                                    key={card.id} 
                                    className='flex items-center gap-1 text-[var(--gray-color-2)]'
                                >
                                    <div className='w-fit text-xl max-[440px]:text-lg'>
                                        {card.icon}
                                    </div>
                                    <p className='text-sm whi'>{card.title}</p>
                                </div>
                            ))}

                        </div>

                        <p className='text-base font-medium text-[var(--black-color-2)] max-[440px]:text-sm'>{data.description}</p>

                        <div className='w-full p-5 flex flex-col gap-5 rounded-md bg-[var(--gray-color-3)]'>

                            <h4 className='text-2xl font-semibold text-[var(--black-color-2)] max-[440px]:text-xl'>Agenda :</h4>

                            <ul className='w-full px-2.5 flex flex-col gap-2.5'>

                                {data.agendaDetails.map((list, idx) => <li key={idx} className='flex items-center gap-2.5'>
                                    <GoDotFill className='text-lg text-[var(--blue-color)] max-[440px]:text-base' />
                                    <p className='text-base font-medium text-[var(--gray-color-2)] max-[440px]:text-sm'>{list}</p>
                                </li>)}

                            </ul>

                        </div>

                        <p className='text-base font-medium text-[var(--black-color-2)] max-[440px]:text-sm'>{data.slogan}</p>

                    </div>

                    <div className='col-span-3 max-[965px]:col-span-4 max-[840px]:col-span-1'>

                        <div className='relative w-full rounded-md bg-[var(--gray-color-3)] p-5 flex flex-col gap-5 overflow-hidden'>

                            {!data.isBooked && data.seatsNumber === 0 && <OutStockEvent />}

                            <div className='flex items-center gap-2.5 text-[var(--black-color-2)]'>
                                <LuTicket className='text-4xl text-[var(--blue-color)] -rotate-45 max-[440px]:text-3xl' />
                                <p className='text-2xl font-semibold'>{data.seatsNumber} Ticket</p>
                            </div>

                            {data.isBooked ? 
                                <button className='
                                    px-5 py-2.5 rounded-md bg-[var(--gray-color-1)] flex items-center justify-center gap-1
                                    text-base text-[var(--blue-color)] font-medium
                                    cursor-pointer border border-[var(--blue-color)]
                                '>
                                    <MdOutlineBookmark className='text-2xl max-[440px]:text-xl' />
                                    <p>{t('bookedWord')}</p>
                                </button>
                                : <button
                                    onClick={handleBooking} disabled={eventLoading}
                                    className='
                                        px-5 py-2.5 rounded-md bg-[var(--blue-color)] flex items-center justify-center gap-1
                                        text-[var(--salt-color)] dark:text-[var(--black-color-2)] cursor-pointer
                                        text-base font-medium
                                    '
                                >
                                    <MdOutlineBookmarkAdd className='text-2xl max-[440px]:text-xl' />
                                    <p>{t('bookNowWord')}</p>
                                </button>
                            }

                            <ul className='flex flex-col gap-2.5'>

                                {rulesData.map(list => (
                                    <li 
                                        key={list.id} 
                                        className='flex items-center gap-1.5 text-[var(--gray-color-2)] text-xl max-[440px]:text-lg'
                                    >
                                        {list.icon}
                                        <p className='text-sm'>{list.title}</p>
                                    </li>
                                ))}

                            </ul>

                        </div>

                    </div>

                </div>

            </section>
        }

        {!isLoading && isError && <FullError icon={errorSVG} msg={'errorFetchMessage'} isRed={true} />}

    </React.Fragment>

}
