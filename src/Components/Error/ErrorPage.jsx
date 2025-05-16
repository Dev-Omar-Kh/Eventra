import React, { useEffect, useState } from 'react';

import errorImgLight from '../../Assets/Images/light-error-img.png';
import errorImgDark from '../../Assets/Images/dark-error-img.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

export default function ErrorPage() {

    const {t, i18n} = useTranslation();

    // ====== check-dark-mode ====== //

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {

        const darkMode = document.documentElement.classList.contains('dark');
        setIsDarkMode(darkMode);

        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();

    }, []);

    return <React.Fragment>

        <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col items-center justify-center gap-10'>

            <img className='w-fit h-96'
                src={isDarkMode ? errorImgDark : errorImgLight} 
                alt={isDarkMode ? 'error page dark img' : 'error page light img'} 
            />

            <p className='text-xl w-2xl max-w-full max-[500px]:text-lg text-center text-[var(--black-color-2)]'>{t('errorPageMsg')}</p>

            <Link 
                to={'/'} 
                className='
                    py-2.5 px-5 rounded-md bg-[var(--blue-color)] text-base font-medium
                    flex items-center gap-1.5 duration-300 hover:gap-2.5
                    text-[var(--salt-color)] dark:text-[var(--black-color-2)]
                '
            >
                <p>{t('goToHomeWord')}</p>
                <IoIosArrowForward className={`text-xl ${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
            </Link>

        </section>

    </React.Fragment>

}
