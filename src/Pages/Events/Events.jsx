import React, { useEffect, useState } from 'react'
import Title from '../../Components/Title/Title'
import Filter from '../../Components/Filter-Button/Filter'
import Card from '../../Components/Event-Card/Card'
import PaginationList from '../../Components/Pagination-List/PaginationList'
import { Axios, getAllEvents } from '../../API/Api'
import { useQuery } from '@tanstack/react-query'
import FullError from '../../Components/Error/FullError'
import LoadingCard from './../../Components/Event-Card/LoadingCard';
import errorSVG from '../../Assets/JSON/wrong.json';
import warnSVG from '../../Assets/JSON/warning.json';
import { BiCategory, BiFilterAlt } from 'react-icons/bi'

export default function Events() {

    const [currentPage, setCurrentPage] = useState(1);
    const [limitEvents, setLimitEvents] = useState(8);
    const [eventType, setEventType] = useState("allEventsWord");

    useEffect(() => {
        setCurrentPage(1);
    }, [eventType, limitEvents]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // ====== get-all-events-data ====== //

    const getApiData = async() => {
        const typeQuery = (eventType === "allEventsWord" ? "" : `&type=${eventType}`);
        const {data} = await Axios.get(`${getAllEvents}/?limit=${limitEvents}&page=${currentPage}${typeQuery}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["getAllEvents", currentPage, limitEvents, eventType], 
        queryFn: getApiData, keepPreviousData: true
    });

    const filterData = ['allEventsWord', ...data?.types || []];
    const limitPerPage = [4, 8, 16, 20];

    return <React.Fragment>

        <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <Title title={'eventsWord'} />

                <div className='flex flex-wrap items-center gap-2.5'>

                    <Filter 
                        data={filterData} icon={<BiFilterAlt />} width={'min-w-48'} 
                        currentFilter={eventType} setCurrentFilter={setEventType} 
                    />

                    <Filter 
                        data={limitPerPage} icon={<BiCategory />} width={'min-w-28'} 
                        currentFilter={limitEvents} setCurrentFilter={setLimitEvents} 
                    />

                </div>

            </div>

            {!isError && isLoading && <div 
                className='w-full grid grid-cols-4 gap-5 max-[1235px]:grid-cols-3 max-[915px]:grid-cols-2 max-[630px]:grid-cols-1'
            >

                {Array.from({length: limitEvents <= 4 ? limitEvents : 4}, (_, idx) => <LoadingCard key={idx} />)}

            </div>}

            {!isError && !isLoading && data && data?.events.length > 0 && <React.Fragment>

                <div className='w-full grid grid-cols-4 gap-5 max-[1235px]:grid-cols-3 max-[915px]:grid-cols-2 max-[630px]:grid-cols-1'>

                    {data.events.map((card, idx) => <Card key={idx} data={card} />)}

                </div>

                <div className='w-full flex items-center justify-center'>

                    <PaginationList data={data?.pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                </div>

            </React.Fragment>}

            {!isError && !isLoading && data && data?.events.length === 0 &&
                <FullError icon={warnSVG} msg={'noEventsYetMessage'} isRed={false} />
            }

            {!isLoading && isError && <FullError icon={errorSVG} msg={'errorFetchMessage'} isRed={true} />}

        </section>

    </React.Fragment>

}
