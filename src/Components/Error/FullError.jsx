import React from 'react';

import errorSVG from '../../Assets/JSON/wrong.json';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';

export default function FullError({icon, msg, isRed}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className={`
            w-full h-60 col-span-3 p-5 rounded-md bg-[var(--salt-color)] shadow-[0_0px_10px_var(--light-black-opacity-color)]
            flex flex-col items-center justify-center border border-solid border-[var(--gray-color-3)]
            ${isRed ? 'text-[var(--red-color)]' : 'text-[var(--gray-color-2)]'}
        `}>

            <Lottie className='w-28' animationData={icon} loop={false} />
            <p className='text-xl font-semibold'>{t(msg)}</p>

        </div>

    </React.Fragment>

}
