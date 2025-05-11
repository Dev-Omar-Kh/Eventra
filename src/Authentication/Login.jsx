import React from 'react'
import { useTranslation } from 'react-i18next';
import { TbLogin2 } from 'react-icons/tb';
import Input from '../Components/Inputs/Manual-Inputs/Input';
import { Link } from 'react-router-dom';
import AuthContainer from './AuthContainer';

export default function Login() {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <AuthContainer>

            <form className={`
                w-3/5 flex flex-col gap-5 p-2.5 max-[800px]:w-full max-[800px]:p-0
                ${i18n.language === 'en' ? 'pl-5 border-l-2 max-[800px]:pl-0' : 'pr-5 border-r-2 max-[800px]:pr-0'}
                border-solid border-[var(--gray-color-3)] dark:border-[var(--gray-color-1)] max-[800px]:border-0
            `}>

                <div className='
                    w-full flex items-center justify-center gap-2.5 text-4xl font-bold text-[var(--blue-color)]
                    max-[800px]:text-3xl
                '>
                    <TbLogin2 />
                    <p className='text-3xl text-[var(--black-color-2)] max-[800px]:text-xl'>
                        {t('welcomeBackWord')}
                    </p>
                </div>

                <div className='flex flex-col gap-2.5'>

                    <Input 
                        id={'email'} label={'emailWord'} type={'text'} password={false}
                        loading={true} placeHolder={'emailPlaceholderWord'}
                    />

                    <Input 
                        id={'password'} label={'passwordWord'} type={'password'} password={true}
                        loading={false} placeHolder={'passwordPlaceholderWord'}
                    />

                    <div className='w-full flex justify-end'>
                        <Link className='text-xs font-medium underline text-[var(--blue-color)]'>
                            {t('forgotPasswordWord')}
                        </Link>
                    </div>

                    <button 
                        type='submit' 
                        className='
                            w-full h-10 rounded-md bg-[var(--blue-color)] text-base font-medium text-[var(--white-color)]
                            cursor-pointer duration-300 hover:bg-[var(--blue-opacity-color)] dark:text-[var(--black-color-2)]
                        '
                    >
                        {t('loginWord')}
                    </button>

                    <div className='
                        w-full text-center flex items-center justify-center gap-1.5 text-xs font-medium
                        text-[var(--black-color-2)]
                    '>
                        <p>{t('doNotHaveAccount')}</p> 
                        <Link className='text-[var(--blue-color)] underline' to={'/sign-up'}>{t('createAccountWord')}</Link>
                    </div>

                </div>

            </form>

        </AuthContainer>

    </React.Fragment>

}
