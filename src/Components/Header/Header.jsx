import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { MdOutlineEventNote } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import Actions from './Actions';
import Logo from '../Logo/Logo';

export default function Header() {

    const {t} = useTranslation();

    // ====== nav-bar-data ====== //

    const navBarData = [

        {id: 1, endpoint: '/', name: 'homeWord', icon: <GoHome />},
        {id: 2, endpoint: '/events', name: 'eventsWord', icon: <MdOutlineEventNote />},
        {id: 3, endpoint: '/admin-panel', name: 'adminPanelWord', icon: <IoSettingsOutline />},

    ];

    // ====== open-close-nav ====== //

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    }

    return <React.Fragment>

        <header className='
            fixed top-0 left-0 w-full py-5 p_x flex items-center gap-5 justify-between 
            border-b border-solid border-[var(--gray-color-3)] bg-[var(--salt-color)] z-50
        '>

            <Link>
                <Logo width={'w-fit'} height={'h-12'} />
            </Link>

            <button 
                onClick={handleNavToggle}
                className='relative w-15 h-11 hidden max-[881px]:flex p-2.5 rounded-md bg-[var(--gray-color-3)] cursor-pointer overflow-hidden'
            >

                <div className={`
                    ${isNavOpen ? 'top-5 -rotate-45' : ''} absolute rounded-md top-2.5 w-10 h-1 bg-[var(--blue-color)] duration-300
                `}></div>
                <div className={`
                    ${isNavOpen ? '-translate-x-15 opacity-0' : ''} absolute rounded-md top-5 w-10 h-1 bg-[var(--blue-color)] duration-300
                `}></div>
                <div className={`
                    ${isNavOpen ? 'bottom-5 rotate-45' : ''} absolute rounded-md bottom-2.5 w-10 h-1 bg-[var(--blue-color)] duration-300
                `}></div>

            </button>

            <nav className={`
                max-[881px]:fixed max-[881px]:start-0 max-[881px]:top-[89px] max-[881px]:w-full nav_height max-[881px]:z-50
                max-[881px]:bg-[var(--salt-color)] max-[881px]:flex max-[881px]:flex-col max-[881px]:gap-5 max-[881px]:py-5
                ${isNavOpen ? 
                    'max-[881px]:translate-y-0 max-[881px]:opacity-100 max-[881px]:visible' : 
                    'max-[881px]:-translate-y-5 max-[881px]:opacity-0 max-[881px]:invisible'
                } duration-300
            `}>

                <ul className='flex items-center gap-2.5 max-[881px]:flex-col max-[881px]:w-full'>

                    {navBarData.map(link => <NavLink 
                        to={link.endpoint} key={link.id}
                        className={`
                            px-5 py-2.5 rounded-md hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)] duration-300
                            text-[var(--gray-color-2)] max-[881px]:w-full
                        `}
                    >
                        <li className='
                            flex items-center gap-2 max-[881px]:w-full max-[881px]:justify-center dark:text-[var(--black-color-2)]
                        '>
                            <div className='text-xl'>
                                {link.icon}
                            </div>
                            <p className='text-base font-medium'>{t(link.name)}</p>
                        </li>
                    </NavLink>)}

                </ul>

                <div className='hidden max-[881px]:inline-block max-[881px]:w-full'>
                    <Actions />
                </div>

            </nav>

            <div className='max-[881px]:hidden'>
                <Actions />
            </div>

        </header>

    </React.Fragment>

}
