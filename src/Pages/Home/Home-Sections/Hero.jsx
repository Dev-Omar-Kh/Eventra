import React from 'react';

import heroImg from '../../../Assets/Images/hero-bg.png';
import { LuTicket, LuTicketCheck } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BsStarHalf } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';

export default function Hero() {

    const {t, i18n} = useTranslation();

    // ====== statistics-data ====== //

    const statisticsData = [

        {id: 1, icon: <HiOutlineSpeakerphone className='text-[var(--blue-color)]' />, num: 350, title: 'totalEventsWord'},
        {id: 3, icon: <LuTicketCheck className='text-[var(--green-color)]' />, num: '52,500', title: 'totalReservedTicketsWord'},
        {id: 2, icon: <BsStarHalf className='text-[var(--yellow-color)]' />, num: 4.8, title: 'usersRatesWord'},
        {id: 4, icon: <BiWorld className='text-[var(--blue-color)]' />, num: 45, title: 'presentCountries'},

    ]

    return <React.Fragment>

        <section 
            className='w-full min-h-screen overlay bg-cover bg-center border-b border-solid border-[var(--gray-color-3)]' 
            style={{backgroundImage: `url(${heroImg})`}}
        >

            <div className='
                w-full min-h-screen px-[4.5%] py-5 pt-[8.3625rem] bg-[var(--light-blue-opacity-color)]
                flex flex-col items-center justify-center gap-20 max-[580px]:gap-10 dark:bg-[var(--light-salt-opacity-color)]
            '>

                <div className='flex flex-col items-center gap-5'>

                    <div className='relative w-fit p-2.5 rounded-md bg-[var(--gray-color-3)] flex items-center gap-5'>

                        <div className={`
                            absolute w-14 h-14 custom-start -top-[3.25rem]
                            ${i18n.language === 'en' ? 'rotate-45' : '-rotate-45'}
                        `}>

                            <div className='relative'>

                                <div className={`
                                    absolute rounded-md -end-4 
                                    ${i18n.language === 'en' ? 'rotate-45' : '-rotate-45'}
                                    w-4 h-1.25 bg-[var(--gray-color-3)] dark:bg-[var(--blue-color)]
                                `}></div>

                                <div className={`
                                    absolute rounded-md end-0 
                                    ${i18n.language === 'en' ? '-rotate-4' : 'rotate-4'}
                                    top-7 -translate-y-1/2 w-8 h-1.25 bg-[var(--gray-color-3)] dark:bg-[var(--blue-color)]
                                `}></div>

                                <div className={`
                                    absolute rounded-md -end-4 top-12 
                                    ${i18n.language === 'en' ? '-rotate-55' : 'rotate-55 '}
                                    w-4 h-1.25 bg-[var(--gray-color-3)] dark:bg-[var(--blue-color)]
                                `}></div>

                            </div>

                        </div>

                        <div className='p-2.5 rounded-md bg-[var(--gray-color-1)] text-[var(--black-color-2)]'>
                            <LuTicket className='text-4xl -rotate-45 max-[715px]:text-3xl max-[605px]:text-2xl' />
                        </div>

                        <p className='text-3xl font-bold text-[var(--black-color-2)] max-[715px]:text-2xl max-[605px]:text-xl'>
                            <span className='text-[var(--blue-color)]'>{t('bookWord') + ' '} </span> {t('heroTitle')}
                        </p>

                    </div>

                    <p className='
                        max-w-xl max-[630]:w-full text-center text-base text-[var(--gray-color-3)] opacity-75 
                        dark:text-[var(--black-color-2)]
                    '>{t('heroSlogan')}</p>

                </div>

                <div className='w-3xl max-w-full grid grid-cols-2 gap-2.5 max-[580px]:grid-cols-1'>

                    {statisticsData.map(card => (
                        <div key={card.id} className='p-2.5 flex items-center gap-2.5 bg-[var(--gray-color-3)] rounded-md'>

                            <div className={`p-2.5 rounded-md text-3xl bg-[var(--gray-color-1)]`}>
                                {card.icon}
                            </div>

                            <div>
                                <p className='text-2xl font-semibold text-[var(--black-color-2)] rtl:flex rtl:justify-end' dir='ltr'>
                                    {card.id !== 2 ? '+ ' + card.num : card.num}
                                </p>
                                <p className='text-base font-medium text-[var(--gray-color-2)]'>{t(card.title)}</p>
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>

    </React.Fragment>

}
