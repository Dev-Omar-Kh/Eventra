import React from 'react'
import Hero from './Home-Sections/Hero'
import TopEvents from './Home-Sections/TopEvents'
import LatestEvents from './Home-Sections/LatestEvents'
import { Helmet } from 'react-helmet'

export default function Home() {

    return <React.Fragment>

        <section >

            <Hero />

            <TopEvents />

            <LatestEvents />

        </section>

    </React.Fragment>

}
