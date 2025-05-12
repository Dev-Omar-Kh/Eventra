import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { MdOutlineEventNote } from 'react-icons/md';

export default function DateInput({id, label, width, onChange, onBlur, value}) {

    const {t} = useTranslation();
    
    const [hasValue, setHasValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setHasValue(value && value.trim() !== '');
    }, [value]);

    const handleInputChange = (e) => {
        setHasValue(e.target.value.trim() !== '');
        if (onChange) onChange(e);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    return <React.Fragment>

        <div className={`relative ${width ? width : 'w-full'} flex flex-col gap-1 group`}>

            <label 
                className={`
                    text-base font-medium 
                    ${hasValue ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'} 
                    duration-300 group-focus-within:text-[var(--blue-color)]
                `} 
                htmlFor={id}
            >{t(label)} :</label>

            <input id={id}
                type={'date'}
                className={`
                    w-full h-10 px-2.5 rounded-md border border-solid 
                    ${hasValue ? 'border-[var(--blue-color)] text-[var(--black-color-2)]' : 'border-[var(--gray-color-2)]'} 
                    ${isFocused ? 
                        'text-[var(--black-color-2)]' : 
                        hasValue ? 'text-[var(--black-color-2)]' : 'text-[var(--gray-color)]'
                    } uppercase custom-icon
                    outline-0 duration-300 focus:border-[var(--blue-color)] text-base font-medium
                `}
                value={value}
                onFocus={handleFocus}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />

            <div className={`
                h-10 absolute bottom-0 right-2.5 flex items-center justify-center z-[0]
                ${isFocused ? 'text-[var(--blue-color)]' : hasValue ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'}
            `}>
                <MdOutlineEventNote className='text-xl' />
            </div>

        </div>

    </React.Fragment>

}
