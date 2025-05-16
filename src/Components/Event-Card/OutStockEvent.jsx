import React from 'react'
import { useTranslation } from 'react-i18next'

export default function OutStockEvent() {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='
            absolute top-0 left-0 w-full h-full bg-[var(--dark-light-black-opacity-color)] z-30
            flex items-center justify-center
        '>

            <p className='
                p-5 rounded-md border-4 border-solid border-[var(--salt-color)] dark:border-[var(--black-color-2)]
                text-xl font-bold uppercase text-[var(--salt-color)] dark:text-[var(--black-color-2)] rotate-12
            '>{t('outOfStockWord')}</p>

        </div>

    </React.Fragment>

}
