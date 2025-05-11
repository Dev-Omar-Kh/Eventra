import React from 'react';
import { Link } from 'react-router-dom';

import fakeImg from '../../Assets/Images/hero-bg.png';
import { LuTicket } from 'react-icons/lu';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

export default function Card() {

    return <React.Fragment>

        <div className='rounded-md overflow-hidden bg-[var(--gray-color-3)]'>

            <Link to={`/events/single-event/1`} className='flex flex-col gap-2.5'>

                <img className='w-full h-56 object-cover max-[630px]:h-fit' src={fakeImg} alt="event-cover" />

                <div className='p-2.5 pb-0 flex flex-col gap-2.5'>

                    <h3 className='text-2xl font-semibold text-[var(--black-color-2)]'>Event Name</h3>

                    <p className='text-base text-[var(--gray-color-2)]'>Aug 15, 2025</p>

                </div>

            </Link>

            <div className='w-full p-2.5 flex items-center justify-between gap-2.5'>

                <div className='flex items-center gap-2.5 text-[var(--gray-color-2)]'>
                    <LuTicket className='text-xl text-[var(--blue-color)] -rotate-45' />
                    <p className='text-base font-semibold'>112 Ticket</p>
                </div>

                <button
                    className='
                        p-1.5 rounded-md bg-[var(--gray-color-1)] flex items-center gap-1
                        text-[var(--blue-color)] cursor-pointer
                    '
                ><MdOutlineBookmarkAdd className='text-2xl' /></button>

            </div>

        </div>

    </React.Fragment>

}
