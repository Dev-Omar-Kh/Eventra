import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import Title from '../../../Components/Title/Title';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Animations from '../../../Animations/Animations';

import conferencesImg from '../../../Assets/Images/Sliders-Images/conferences.jpg';
import showsPerformancesImg from '../../../Assets/Images/Sliders-Images/theatrical-performance.jpg';
import exhibitionsImg from '../../../Assets/Images/Sliders-Images/exhibitions.jpg';
import festivalsImg from '../../../Assets/Images/Sliders-Images/Festival.webp';
import coursesWorkshopsImg from '../../../Assets/Images/Sliders-Images/training-courses-workshops.jpg';
import musicConcertsImg from '../../../Assets/Images/Sliders-Images/Concert.webp';

export default function TopEvents() {

    const {t, i18n} = useTranslation();

    // ====== slider-card-data ====== //

    const cardsData = [

        {id: 1, image: conferencesImg, title: 'conferencesWord', explain: 'conferencesSlogan', link: '/events'},
        {id: 2, image: showsPerformancesImg, title: 'showsPerformancesWord', explain: 'showsPerformancesSlogan', link: '/events'},
        {id: 3, image: exhibitionsImg, title: 'exhibitionsWord', explain: 'exhibitionsSlogan', link: '/events'},
        {id: 4, image: festivalsImg, title: 'festivalsWord', explain: 'festivalsSlogan', link: '/events'},
        {id: 5, image: coursesWorkshopsImg, title: 'coursesWorkshopsWord', explain: 'coursesWorkshopsSlogan', link: '/events'},
        {id: 6, image: musicConcertsImg, title: 'musicConcertsWord', explain: 'musicConcertsSlogan', link: '/events'},

    ];

    // ====== slider-setting ====== //

    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };

    const previous = () => {
        sliderRef.slickPrev();
    };

    const settings = {

        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        rtl: i18n.language === 'ar',

    };

    return <React.Fragment>

        <motion.section
            variants={Animations.addAnimationToChildOnlyVariants}
            initial='hidden' whileInView={'visible'} viewport={{once: true}}
            className='py-[3.125rem] p_x flex flex-col gap-10 overflow-hidden'
        >

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <motion.div variants={Animations.toRightVariants}><Title title={'weOfferWord'} /></motion.div>

                <motion.div 
                    variants={Animations.toLeftVariants} 
                    className='flex items-center gap-2.5 max-[465px]:w-full max-[465px]:grid max-[465px]:grid-cols-2'
                >

                    <button 
                        onClick={i18n.language === 'en' ? previous : next}
                        className='
                            p-2.5 rounded-md bg-[var(--gray-color-3)] text-2xl text-[var(--blue-color)] rtl:rotate-180
                            cursor-pointer max-[465px]:flex max-[465px]:justify-center
                        '
                    >
                        <IoIosArrowBack />
                    </button>

                    <button 
                        onClick={i18n.language === 'en' ? next : previous}
                        className='
                            p-2.5 rounded-md bg-[var(--gray-color-3)] text-2xl text-[var(--blue-color)] rtl:rotate-180
                            cursor-pointer max-[465px]:flex max-[465px]:justify-center
                        '
                    >
                        <IoIosArrowForward />
                    </button>

                </motion.div>

            </div>

            <motion.div variants={Animations.opacityVariants}>
                <Slider 
                    className='h-96 rounded-md overflow-hidden border border-solid border-[var(--blue-color)]' 
                    ref={slider => {sliderRef = slider}} {...settings}
                >

                    {cardsData.map(card => <div key={card.id}>

                        <div 
                            className='w-full h-96 min-w-full flex-shrink-0 rounded-md overlay bg-cover bg-center overflow-hidden' 
                            style={{backgroundImage: `url(${card.image})`}}
                        >

                            <div 
                                style={i18n.language === 'en' ? 
                                    {backgroundImage: 'var(--light-black-opacity-color-left)'}
                                    : {backgroundImage: 'var(--light-black-opacity-color-right)'}
                                } 
                                dir={i18n.language == 'ar' ? 'rtl' : 'ltr'} 
                                className='
                                    w-full h-full p-5 flex flex-col justify-end gap-2.5
                                '
                            >

                                <h3 className='
                                    text-2xl font-semibold text-[var(--salt-color)] dark:text-[var(--black-color-2)]
                                    uppercase tracking-[0.15rem] rtl:tracking-normal
                                '>{t(card.title)}</h3>

                                <p className='text-base opacity-75 text-[var(--salt-color)] dark:text-[var(--black-color-2)]'>
                                    {t(card.explain)}
                                </p>

                                <Link to={card.link} className='
                                    w-fit px-5 py-2.5 rounded-md bg-[var(--blue-color)] text-base font-medium text-[var(--salt-color)]
                                    dark:text-[var(--black-color-2)] flex items-center gap-1.5 duration-300 hover:gap-2.5
                                '>
                                    <p>{t('exploreEventsWord')}</p>
                                    <IoIosArrowForward className='text-xl rtl:rotate-180' />
                                </Link>

                            </div>

                        </div>

                    </div>)}

                </Slider>
            </motion.div>

        </motion.section>

    </React.Fragment>

}
