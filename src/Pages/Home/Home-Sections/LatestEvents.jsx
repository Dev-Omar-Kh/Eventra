import React from 'react'
import Title from '../../../Components/Title/Title'
import Filter from '../../../Components/Filter-Button/Filter'
import Card from '../../../Components/Event-Card/Card'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

export default function LatestEvents() {

    const {t} = useTranslation();

    return <React.Fragment>

        <section className='w-full py-[3.125rem] p_x flex flex-col gap-10'>

        <div className='w-full flex flex-wrap items-center justify-between gap-5'>

            <Title title={'latestEventsWord'} />

            <Filter />

        </div>

        <div className='w-full grid grid-cols-4 gap-5 max-[1235px]:grid-cols-3 max-[915px]:grid-cols-2 max-[630px]:grid-cols-1'>

            {Array.from({ length: 6 }, (_, idx) => <Card key={idx} />)}

        </div>

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

        </section>

    </React.Fragment>

}
