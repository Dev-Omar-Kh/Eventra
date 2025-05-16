import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { TbLogin2 } from 'react-icons/tb';
import Input from '../Components/Inputs/Manual-Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import AuthContainer from './AuthContainer';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../Validations/authValidation';
import { Axios } from '../API/Api';
import { loginAPI } from '../API/Api';
import { AnimatePresence, motion } from 'framer-motion';
import ResponsePage from './../Components/Status-Page/ResponsePage';
import { PacmanLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import Animations from '../Animations/Animations';

export default function Login() {

    const {t, i18n} = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ====== setup-formik-form ====== //

    const values = {
        email: '',
        password: ''
    }

    const submitForm = async(values) => {

        setIsLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {

            const res = await Axios.post(loginAPI, values);
            const isSuccess = res.status === 200 || res.status === 201;
            const hasValidData = res?.data?.token && res?.data?.user;

            if(isSuccess && hasValidData){
                setSuccessMsg(`loginWelcomeMessage`);
                setUserName(res.data.user.name);
            }

            const token = res?.data?.token;
            const expiresAt = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

            setTimeout(() => {

                setSuccessMsg(null);
                setUserName(null);

                setTimeout(() => {
                    Axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    dispatch(login({token, expiresAt}));
                    navigate('/');
                }, 300);

            }, 2000);

        } catch (error) {

            console.error(error);
            setErrMsg('loginErrorMsg');
            setTimeout(() => {
                setErrMsg(null);
                formikObj.setFieldValue('password', '');
            }, 2000);

        } finally {
            setIsLoading(false);
        }

    }

    const formikObj = useFormik({
        initialValues: values,
        onSubmit: submitForm,
        validationSchema: loginValidationSchema(t),
    });

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <ResponsePage type={true} msg={successMsg} userName={userName} />}
            {errMsg && <ResponsePage type={false} msg={errMsg} />}
        </AnimatePresence>

        <AuthContainer>

            <form 
                onSubmit={formikObj.handleSubmit} 
                className={`
                    relative w-3/5 flex flex-col gap-5 p-2.5 max-[800px]:w-full max-[800px]:p-0 duration-300
                    ${i18n.language === 'en' ? 'pl-5 border-l-2 max-[800px]:pl-0' : 'pr-5 border-r-2 max-[800px]:pr-0'}
                    border-solid border-[var(--gray-color-3)] dark:border-[var(--gray-color-1)] max-[800px]:border-0
                `}
            >

                <AnimatePresence>
                    {isLoading && 
                        <motion.div 
                            initial={{opacity: 0}} animate={{opacity: 0.6}} 
                            exit={{opacity: 0}} transition={{duration: 0.3}}
                            className='absolute top-0 left-0 w-full h-full bg-[var(--salt-color)] dark:bg-[var(--gray-color-3)] z-20'
                        ></motion.div>
                    }
                </AnimatePresence>

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

                    <Input id={'email'} 
                        label={'emailWord'} type={'text'} password={false}
                        loading={true} placeHolder={'emailPlaceholderWord'}
                        onChange={formikObj.handleChange} value={formikObj.values.email}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.email && formikObj.errors.email ? formikObj.errors.email : null}
                    />

                    <Input id={'password'} 
                        label={'passwordWord'} type={'password'} password={true}
                        loading={false} placeHolder={'passwordPlaceholderWord'}
                        onChange={formikObj.handleChange} value={formikObj.values.password}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
                    />

                    {/* <div className='w-full flex justify-end'>
                        <Link className='text-xs font-medium underline text-[var(--blue-color)]'>
                            {t('forgotPasswordWord')}
                        </Link>
                    </div> */}

                    <button 
                        type='submit' 
                        className='
                            w-full h-10 rounded-md bg-[var(--blue-color)] text-base font-medium text-[var(--salt-color)]
                            cursor-pointer duration-300 hover:bg-[var(--blue-opacity-color)] dark:text-[var(--black-color-2)]
                            flex items-center justify-center
                        '
                    >
                        {isLoading ? 
                            <PacmanLoader color='var(--salt-color-const)' size={8} speedMultiplier={1} />
                            : t('loginWord')
                        }
                    </button>

                    <div className='
                        w-full text-center flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium
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
