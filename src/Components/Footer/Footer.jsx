import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

export default function Footer() {

    const {t} = useTranslation();

    const [stars, setStars] = useState([false, false, false, false, false]);

    const toggleStar = (index) => {
        const updatedStars = stars.map((_, i) => {
            if (i <= index) {
                return true;
            }
            return false;
        });
        setStars(updatedStars);
    };

    return <React.Fragment>

        <footer className='
            w-full py-[3.125rem] pb-0 p_x border-t border-solid border-[var(--gray-color-3)] 
            grid grid-cols-2 gap-5 max-[1100px]:grid-cols-5 max-[910px]:grid-cols-1 max-[910px]:gap-x-0
        '>

            <div className='flex flex-col gap-5 max-[1100px]:col-span-2 max-[910px]:col-span-1'>

                <Logo width={'w-fit'} height={'h-18'} />

                <p className='max-w-lg text-base font-medium text-[var(--gray-color-2)]'>{t('footerSentience')}</p>

            </div>

            <div className='grid grid-cols-3 gap-5 max-[1100px]:col-span-3 max-[910px]:grid-cols-2 max-[725px]:grid-cols-1'>

                <div className='
                    p-2.5 col-span-2 rounded-md bg-[var(--gray-color-3)] flex flex-col gap-5 items-center justify-center
                    max-[910px]:col-span-1 max-[725px]:py-5
                '>

                    <div className='p-2.5 rounded-md bg-[var(--gray-color-1)]'>
                        <RiCustomerService2Line className='text-4xl text-[var(--blue-color)]' />
                    </div>

                    <p className='text-base font-medium text-[var(--black-color-2)] max-[365px]:text-sm'>
                        eventra.costumerservice@eventra.com
                    </p>

                </div>

                <div className='
                    p-2.5 rounded-md bg-[var(--gray-color-3)] flex flex-col gap-5 items-center justify-center 
                    max-[725px]:py-5
                '>

                    <div className='p-2.5 rounded-md bg-[var(--gray-color-1)]'>
                        <BsStarHalf className='text-4xl text-[var(--yellow-color)]' />
                    </div>

                    <div className='flex items-center gap-1'>

                        {stars.map((isFilled, index) => (
                            <div key={index} onClick={() => toggleStar(index)} className="cursor-pointer">
                                {isFilled ? (
                                    <BsStarFill className="text-xl text-[var(--yellow-color)]" />
                                ) : (
                                    <BsStar className="text-xl text-[var(--gray-color-2)]" />
                                )}
                            </div>
                        ))}

                    </div>

                </div>

            </div>

            <div className='col-span-2 p-5 text-center border-t border-solid border-[var(--gray-color-3)] max-[910px]:col-span-1'>
                <p className='text-base text-[var(--gray-color-2)] max-[365px]:text-sm'>
                    © 2025 <span className='text-[var(--blue-color)] font-medium'>{t('footerName')}</span>. {t('footerMsg')}.
                </p>
            </div>

        </footer>

    </React.Fragment>

}
