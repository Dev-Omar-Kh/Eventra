import React, { useState } from 'react'
import Input from '../../Components/Inputs/Manual-Inputs/Input'
import Textarea from './../../Components/Inputs/Textarea/Textarea';
import ImgInput from './../../Components/Inputs/Images-Input/ImgInput';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import ListInput from './../../Components/Inputs/List-Input/ListInput';
import DateInput from '../../Components/Inputs/Date-Input/DateInput';
import Title from './../../Components/Title/Title';
import { addNewEvent, Axios, getAllEvents } from '../../API/Api';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import axios from 'axios';
import { eventValidationSchema } from '../../Validations/eventValidation';
import { useNavigate } from 'react-router-dom';
import ResponsePage from '../../Components/Status-Page/ResponsePage';
import { PacmanLoader } from 'react-spinners';

export default function AddEvent() {

    const {t} = useTranslation();

    // ====== handle-agenda-items ====== //

    const addAgendaItem = () => {

        if (formikObj.values.agendaDetails.length < 15) {
            const updated = [...formikObj.values.agendaDetails, ''];
            formikObj.setFieldValue('agendaDetails', updated);
        }

    };

    const removeAgendaItem = () => {

        if (formikObj.values.agendaDetails.length > 1) {
            const updated = formikObj.values.agendaDetails.slice(0, -1);
            formikObj.setFieldValue('agendaDetails', updated);
        }

    };

    // ====== get-all-events-types-data ====== //
    
    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllEvents}`);
        return data
    }

    const { data } = useQuery({queryKey: ["getAllTypes"], queryFn: getApiData});

    const filtersTypes = data?.types || [];

    // ====== setup-formik ====== //

    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const values = {
        image: null,
        name: '',
        location: '',
        type: '',
        date: '',
        seatsNumber: '',
        slogan: '',
        description: '',
        agendaDetails: ['',''],
    }

    const sendEventData = async(values) => {

        setIsLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        let imageUrl = '';

        try {

            if (values.image) {
                
                if (!values.image.type?.startsWith("image/")) {
                    setErrMsg(t('invalidImageType'));
                    return;
                }
                
                imageUrl = await uploadImageToCloudinary(values.image);
                
                if (!imageUrl) {
                    setErrMsg(t('imageUploadFailed'));
                    setTimeout(() => {
                        setErrMsg(null)
                    }, 2000);
                    return;
                }

            }

            const payload = {
                ...values,
                image: imageUrl,
            };

            const res = await Axios.post(addNewEvent, payload);
            const isSuccess = res.status === 200 || res.status === 201;

            if(isSuccess){

                setSuccessMsg(`eventAddedSuccessfullyMsg`);

                setTimeout(() => {

                    setSuccessMsg(null);

                    setTimeout(() => {
                        navigate('/admin-panel');
                    }, 300);

                }, 2000);

            }

        } catch (error) {
            console.error(error);
            setErrMsg('errorAddEventMsg');
        } finally {
            setIsLoading(false);
        }

    }

    const formikObj = useFormik({

        initialValues: values,

        validationSchema: eventValidationSchema(t),

        onSubmit: sendEventData,

    });

    // ====== upload-image-to-cloudinary ====== //

    const uploadImageToCloudinary = async (file) => {

        if (!file.type.startsWith("image/")) {
            console.log('notImage');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        try {

            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

            const response = await axios.post(url, formData);
            return response.data.secure_url;

        } catch (err) {
            console.error("Upload failed", err);
        }

    };

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <ResponsePage type={true} msg={successMsg} />}
            {errMsg && <ResponsePage type={false} msg={errMsg} />}
        </AnimatePresence>

        <motion.section
            variants={Animations.addAnimationToChildOnlyVariants}
            initial='hidden' whileInView={'visible'} viewport={{once: true}}
            className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10 overflow-hidden'
        >

            <motion.div variants={Animations.toRightVariants}><Title title={'addEventWord'} /></motion.div>

            <motion.form
                variants={Animations.scaleVariants}
                onSubmit={(e) => {window.scrollTo({ top: 0, behavior: 'smooth' }); formikObj.handleSubmit(e)}} 
                className={`
                    relative
                    rounded-md bg-[var(--salt-color)] shadow-[0_0px_10px_var(--light-black-opacity-color)] 
                    border border-solid border-[var(--gray-color-3)] py-5 px-[2.25%] grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1
                `}
            >

                <AnimatePresence>
                    {isLoading && 
                        <motion.div 
                            variants={Animations.opacityVariants}
                            initial='hidden' animate='visible' exit={'exit'}
                            className='absolute top-0 left-0 w-full h-full bg-[var(--lighter-salt-opacity-color)] z-20'
                        ></motion.div>
                    }
                </AnimatePresence>

                <div className='col-span-2 flex flex-col gap-2.5 max-[785px]:col-span-1'>

                    {formikObj.values.image && <img 
                        className='w-fit h-16 rounded-md object-cover' 
                        src={formikObj.values.img_preview} alt="eventImg" 
                    />}

                    <ImgInput label={'uploadImageWord'} 
                        value={formikObj.values.image} 
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                                formikObj.setFieldValue('image', file);
                                formikObj.setFieldValue('img_preview', URL.createObjectURL(file));
                            }
                        }}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.image && formikObj.errors.image ? formikObj.errors.image : null}
                    />

                </div>

                <Input id={'name'} 
                    label={'eventNameWord'} type={'text'} password={false}
                    loading={true} placeHolder={'eventNamePlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.name}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.name && formikObj.errors.name ? formikObj.errors.name : null}
                />

                <Input id={'location'} 
                    label={'locationWord'} type={'text'} password={false}
                    loading={true} placeHolder={'locationPlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.location}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.location && formikObj.errors.location ? formikObj.errors.location : null}
                />

                <ListInput id={'type'} 
                    label={'chooseEventType'}
                    placeHolder={'chooseEventTypePlaceholder'}
                    options={filtersTypes}
                    onChange={formikObj.handleChange} value={formikObj.values.type}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.type && formikObj.errors.type ? formikObj.errors.type : null}
                />

                <DateInput id={'date'} 
                    label={'eventDateWord'}
                    onChange={formikObj.handleChange} value={formikObj.values.date}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.date && formikObj.errors.date ? formikObj.errors.date : null}
                />

                <Input id={'seatsNumber'} 
                    label={'numOfSeatsWord'} type={'text'} password={false}
                    loading={true} placeHolder={'numOfSeatsPlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.seatsNumber}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.seatsNumber && formikObj.errors.seatsNumber ? 
                        formikObj.errors.seatsNumber 
                        : null
                    }
                />

                <Input id={'slogan'} 
                    label={'eventSloganWord'} type={'text'} password={false}
                    loading={true} placeHolder={'eventSloganPlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.slogan}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.slogan && formikObj.errors.slogan ? formikObj.errors.slogan : null}
                />

                <div className='col-span-2 max-[785px]:col-span-1'>
                    <Textarea id={'description'} 
                        label={'eventDescriptionWord'} 
                        placeHolder={'eventDescriptionPlaceholder'} 
                        onChange={formikObj.handleChange} value={formikObj.values.description}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.description && formikObj.errors.description ? 
                            formikObj.errors.description 
                            : null
                        }
                    />
                </div>

                <div className='
                    col-span-2 p-5 rounded-md bg-[var(--gray-color-3)] max-[785px]:gap-2.5 my-2.5
                    flex flex-col gap-5 duration-300 max-[785px]:col-span-1 max-[785px]:p-2.5
                '>

                    <div className='grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1'>

                        <AnimatePresence>

                            {formikObj.values.agendaDetails.map((_, idx) => <motion.div 
                                key={idx}
                                variants={Animations.scaleVariants}
                                initial='hidden' animate='visible' exit={'exit'}
                            >

                                <Input id={`agendaDetails[${idx}]`} 
                                    label={`agendaItemWord`} type={'text'} password={false}
                                    loading={true} placeHolder={`agendaPlaceholderWord`}
                                    onChange={formikObj.handleChange} value={formikObj.values.agendaDetails[idx]}
                                    onBlur={formikObj.handleBlur}
                                    ValidationError={
                                        formikObj.touched.agendaDetails &&
                                        formikObj.touched.agendaDetails[idx] &&
                                        formikObj.errors.agendaDetails &&
                                        formikObj.errors.agendaDetails[idx]
                                            ? formikObj.errors.agendaDetails[idx]
                                            : null
                                    }
                                />

                            </motion.div>)}

                        </AnimatePresence>

                    </div>

                    <div className='w-full flex items-center justify-end gap-2.5'>

                        <button 
                            type='button'
                            onClick={removeAgendaItem}
                            disabled={formikObj.values.agendaDetails.length === 1}
                            className={`
                                p-2.5 rounded-md bg-[var(--gray-color-1)] text-[var(--red-color)] text-2xl
                                ${formikObj.values.agendaDetails.length === 1 ? 
                                    'opacity-50 cursor-not-allowed' 
                                    : 'opacity-100 cursor-pointer'
                                }
                            `}
                        ><IoIosRemoveCircleOutline /></button>

                        <button 
                            type='button'
                            onClick={addAgendaItem}
                            disabled={formikObj.values.agendaDetails.length >= 15}
                            className={`
                                p-2.5 rounded-md bg-[var(--blue-color)] text-[var(--salt-color)] 
                                dark:text-[var(--black-color-2)] text-2xl
                                ${formikObj.values.agendaDetails.length >= 15 ? 
                                    'opacity-50 cursor-not-allowed' 
                                    : 'opacity-100 cursor-pointer'
                                }
                            `}
                        ><IoIosAddCircleOutline /></button>

                    </div>

                </div>

                <div className='col-span-2 max-[785px]:col-span-1'>

                    <button type='submit' className='
                        w-full py-2.5 px-5 rounded-md bg-[var(--blue-color)] 
                        text-[var(--salt-color)] font-medium dark:text-[var(--black-color-2)]
                        flex items-center justify-center gap-2.5 cursor-pointer
                    '>
                        {isLoading ? 
                            <PacmanLoader color='var(--salt-color-const)' size={8} speedMultiplier={1} />
                            : <>
                                <IoIosAddCircleOutline className='text-2xl' />
                                <p>{t('addEventWord')}</p>
                            </>
                        }
                    </button>

                </div>

            </motion.form>

        </motion.section>

    </React.Fragment>

}
