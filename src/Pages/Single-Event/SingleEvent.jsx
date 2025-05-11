import React from 'react';

import fakeImg from '../../Assets/Images/Sliders-Images/conferences.jpg';
import { MdChatBubbleOutline, MdEventNote, MdOutlineBookmarkAdd, MdOutlineLocationOn, MdOutlineNoFood } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { LuTicket } from 'react-icons/lu';
import { PiChair, PiOfficeChairLight } from 'react-icons/pi';
import LoadingSingleEvent from './LoadingSingleEvent';

export default function SingleEvent() {

    const eventData = [
        {id: 1, icon: <MdEventNote />, title: 'September 20, 2024'},
        {id: 2, icon: <MdOutlineLocationOn />, title: 'San Francisco Convention Center'},
        {id: 3, icon: <MdChatBubbleOutline />, title: 'Technology'}
    ];

    const agendaData = [
        {id: 1, title: 'Keynote speeches from tech industry leaders'},
        {id: 2, title: 'Interactive workshops and coding sessions'},
        {id: 3, title: 'Networking opportunities with industry professionals'},
        {id: 4, title: 'Latest technology demonstrations and exhibitions'},
        {id: 5, title: 'Career fair with leading tech companies'},
    ];

    const rulesData = [
        {id: 1, icon: <PiChair />, title: 'One seat per reservation'},
        {id: 2, icon: <MdOutlineNoFood />, title: 'Food is not available in the hall.'},
    ];

    return <React.Fragment>

        <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'>

            <img className='w-full max-h-112 object-cover rounded-md' src={fakeImg} alt="" />

            <div className='grid grid-cols-10 gap-5 max-[965px]:grid-cols-11 max-[840px]:grid-cols-1'>

                <div className='col-span-7 flex flex-col gap-5 max-[840px]:col-span-1'>

                    <h3 className='text-3xl font-bold text-[var(--black-color-2)] max-[440px]:text-2xl'>Tech Conference 2024</h3>

                    <div className='flex flex-wrap items-center gap-5'>

                        {eventData.map(card => (
                            <div key={card.id} className='flex items-center gap-1 text-[var(--gray-color-2)] text-xl max-[440px]:text-lg'>
                                {card.icon}
                                <p className='text-sm'>{card.title}</p>
                            </div>
                        ))}

                    </div>

                    <p className='text-base font-medium text-[var(--black-color-2)] max-[440px]:text-sm'>Join us for the most anticipated tech conference of 2024! This premier event brings together industry leaders, innovators, and tech enthusiasts for two days of inspiring keynotes, hands-on workshops, and unparalleled networking opportunities.</p>

                    <div className='w-full p-5 flex flex-col gap-5 rounded-md bg-[var(--gray-color-3)]'>

                        <h4 className='text-2xl font-semibold text-[var(--black-color-2)] max-[440px]:text-xl'>Agenda :</h4>

                        <ul className='w-full px-2.5 flex flex-col gap-2.5'>

                            {agendaData.map(list => <li key={list.id} className='flex items-center gap-2.5'>
                                <GoDotFill className='text-lg text-[var(--blue-color)] max-[440px]:text-base' />
                                <p className='text-base font-medium text-[var(--gray-color-2)] max-[440px]:text-sm'>{list.title}</p>
                            </li>)}

                        </ul>

                    </div>

                    <p className='text-base font-medium text-[var(--black-color-2)] max-[440px]:text-sm'>Don't miss this opportunity to be part of the future of technology!</p>

                </div>

                <div className='col-span-3 max-[965px]:col-span-4 max-[840px]:col-span-1'>

                    <div className='w-full rounded-md bg-[var(--gray-color-3)] p-5 flex flex-col gap-5'>

                        <div className='flex items-center gap-2.5 text-[var(--black-color-2)]'>
                            <LuTicket className='text-4xl text-[var(--blue-color)] -rotate-45 max-[440px]:text-3xl' />
                            <p className='text-2xl font-semibold'>112 Ticket</p>
                        </div>

                        <button
                            className='
                                px-5 py-2.5 rounded-md bg-[var(--blue-color)] flex items-center justify-center gap-1
                                text-[var(--salt-color)] dark:text-[var(--black-color-2)] cursor-pointer
                                text-base max-[440px]:text-sm
                            '
                        >
                            <MdOutlineBookmarkAdd className='text-2xl max-[440px]:text-xl' />
                            <p>Book Now</p>
                        </button>

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

    </React.Fragment>

}
