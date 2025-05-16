import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuTicket } from 'react-icons/lu';
import { MdOutlineBookmark, MdOutlineBookmarkAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { bookEventFun, resetBookingState } from '../../redux/bookingSlice';
import FullLoading from '../Loading/FullLoading';
import { AnimatePresence } from 'framer-motion';
import ResponsePage from '../Status-Page/ResponsePage';
import OutStockEvent from './OutStockEvent';

export default function Card({data}) {

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, success, error } = useSelector((state) => state.booking);
    const eventId = data._id;
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

        <div className='relative rounded-md overflow-hidden bg-[var(--gray-color-3)] border border-[var(--gray-color-3)]'>

            {!data.isBooked && data.seatsNumber === 0 && <OutStockEvent />}

            <Link to={`/events/single-event/${data._id}`} className='flex flex-col gap-2.5'>

                <div className='w-full h-56 max-[630px]:h-fit bg-[var(--gray-color)]'>
                    <img className='w-full h-full object-cover max-[630px]:h-fit' src={data.image} alt={`${data.name} image`} />
                </div>

                <div className='p-2.5 pb-0 flex flex-col gap-2.5'>

                    <h3 className='text-2xl font-semibold text-[var(--black-color-2)]'>{data.name}</h3>

                    <p className='text-base text-[var(--gray-color-2)]'>{data.date.split('T')[0]}</p>

                </div>

            </Link>

            <div className='w-full p-2.5 flex items-center justify-between gap-2.5'>

                <div className='flex items-center gap-2.5 text-[var(--gray-color-2)]'>
                    <LuTicket className='text-xl text-[var(--blue-color)] -rotate-45' />
                    <p className='text-base font-semibold'>{data.seatsNumber} Ticket{data.seatsNumber > 1 && "s"}</p>
                </div>

                <button
                    onClick={handleBooking} disabled={eventLoading}
                    className='
                        p-1.5 rounded-md bg-[var(--gray-color-1)] flex items-center gap-1
                        text-[var(--blue-color)] cursor-pointer text-2xl
                    '
                >
                    {data.isBooked ? <MdOutlineBookmark /> : <MdOutlineBookmarkAdd />}
                </button>

            </div>

        </div>

    </React.Fragment>

}
