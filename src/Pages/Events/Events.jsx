import React from 'react'
import Title from '../../Components/Title/Title'
import Filter from '../../Components/Filter-Button/Filter'
import Card from '../../Components/Event-Card/Card'
import PaginationList from '../../Components/Pagination-List/PaginationList'

export default function Events() {

    return <React.Fragment>

        <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <Title title={'eventsWord'} />

                <Filter />

            </div>

            <div className='w-full grid grid-cols-4 gap-5 max-[1235px]:grid-cols-3 max-[915px]:grid-cols-2 max-[630px]:grid-cols-1'>

                {Array.from({ length: 12 }, (_, idx) => <Card key={idx} />)}

            </div>

            <div className='w-full flex items-center justify-center'>

                <PaginationList />

            </div>

        </section>

    </React.Fragment>

}
