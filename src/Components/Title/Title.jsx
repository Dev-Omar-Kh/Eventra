import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Title({title}) {

    const {t, i18n} = useTranslation();

    // ====== count-element-height ====== //

    const titleRef = useRef(null);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {

        const handleResize = () => {

            setLineHeight(titleRef.current?.clientHeight || 0);

        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);

    }, [title, i18n.language]);

    return <React.Fragment>

        <div className='w-fit flex items-center gap-3'>

            <span style={{height: lineHeight}} className='inline-block w-2 bg-[var(--blue-color)] rounded-4xl'></span>

            <h3 ref={titleRef} className='text-4xl font-bold text-[var(--black-color-2)] uppercase max-[425px]:text-2xl'>{t(title)}</h3>

        </div>

    </React.Fragment>

}
