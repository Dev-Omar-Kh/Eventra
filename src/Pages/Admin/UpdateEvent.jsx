import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Manual-Inputs/Input';
import Textarea from './../../Components/Inputs/Textarea/Textarea';
import ImgInput from './../../Components/Inputs/Images-Input/ImgInput';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import ListInput from './../../Components/Inputs/List-Input/ListInput';
import DateInput from '../../Components/Inputs/Date-Input/DateInput';
import Title from './../../Components/Title/Title';
import { Axios, getAllEvents } from '../../API/Api';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import axios from 'axios';
import { eventValidationSchema } from '../../Validations/eventValidation';
import ResponsePage from '../../Components/Status-Page/ResponsePage';
import { PacmanLoader } from 'react-spinners';
import FullError from '../../Components/Error/FullError';
import errorSVG from '../../Assets/JSON/wrong.json';
import { TfiReload } from 'react-icons/tfi';

export default function UpdateEvent() {

    const {t} = useTranslation();
    const {id} = useParams();
    const navigate = useNavigate();

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

    // ====== get-one-event-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllEvents}/${id}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({queryKey: ["getUpdateEvent", id], queryFn: getApiData});

    // ====== get-all-events-types-data ====== //

    const getAllTypes = async() => {
        const {data} = await Axios.get(`${getAllEvents}`);
        return data
    }

    const { data: types } = useQuery({queryKey: ["getAllTypes"], queryFn: getAllTypes});

    const filtersTypes = types?.types || [];

    // ====== setup-formik ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const values = {  
        image: data?.image || '',  
        img_preview: data?.image || '',  
        name: data?.name || '',  
        location: data?.location || '',  
        type: data?.type || '',  
        date: data?.date.split('T')[0] || '',  
        seatsNumber: data?.seatsNumber || '',  
        slogan: data?.slogan || '',  
        description: data?.description || '',  
        agendaDetails: data?.agendaDetails || ['', ''],  
    }

    const sendEventData = async (values) => {  

        setIsUpdateLoading(true);  
        setSuccessMsg(null);  
        setErrMsg(null);  

        try {  

            const { img_preview, ...cleanedValues } = values;
    
            let imageUrl = img_preview;

            if (values.image instanceof File) {
                imageUrl = await uploadImageToCloudinary(values.image);
            } 

            const payload = {
                ...cleanedValues,
                image: imageUrl
            };  

            const res = await Axios.put(`${getAllEvents}/${id}`, payload);  
            const isSuccess = res.status === 200 || res.status === 201;

            if (isSuccess) {  

                setSuccessMsg(t('eventUpdatedSuccessfullyMsg'));  

                setTimeout(() => {

                    setSuccessMsg(null);

                    setTimeout(() => {
                        navigate('/admin-panel');
                    }, 300);

                }, 2000);

            }  
        } catch (error) {  
            console.error(error);  
            setErrMsg(t('errorUpdateEventMsg'));  
        } finally {  
            setIsUpdateLoading(false);  
        }  

    }  

    const formikObj = useFormik({
    
        initialValues: values,

        enableReinitialize: true,  

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

        {isError && <FullError icon={errorSVG} msg={'errorFetchMessage'} isRed={true} />}

        <AnimatePresence>
            {successMsg && <ResponsePage type={true} msg={successMsg} />}
            {errMsg && <ResponsePage type={false} msg={errMsg} />}
        </AnimatePresence>

        <motion.section
            variants={Animations.addAnimationToChildOnlyVariants}
            initial='hidden' whileInView={'visible'} viewport={{once: true}}
            className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10 overflow-hidden'
        >

        <motion.div variants={Animations.toRightVariants}><Title title={'updateEventWord'} /></motion.div>

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
                    {(isUpdateLoading || isLoading) && 
                        <motion.div 
                            variants={Animations.opacityVariants}
                            initial='hidden' animate='visible' exit={'exit'}
                            className='absolute top-0 left-0 w-full h-full bg-[var(--lighter-salt-opacity-color)] z-20'
                        ></motion.div>
                    }
                </AnimatePresence>

                <div className='col-span-2 flex flex-col gap-2.5 max-[785px]:col-span-1'>

                    {formikObj.values.img_preview && <img  
                        className='w-fit h-16 rounded-md object-cover' 
                        src={formikObj.values.img_preview} alt="eventImage"  
                    />}  

                    <ImgInput label={'updateImageWord'}  
                        value={formikObj.values.image}  
                        onChange={(e) => {  
                            const file = e.target.files[0];  
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
                    mode='edit'
                    label={'eventNameWord'} type={'text'} password={false}
                    loading={true} placeHolder={isLoading ? 'loadingWord' : 'eventNamePlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.name}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.name && formikObj.errors.name ? formikObj.errors.name : null}
                />

                <Input id={'location'} 
                    mode='edit'
                    label={'locationWord'} type={'text'} password={false}
                    loading={true} placeHolder={isLoading ? 'loadingWord' : 'locationPlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.location}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.location && formikObj.errors.location ? formikObj.errors.location : null}
                />

                <ListInput id={'type'} 
                    mode='edit'
                    label={'chooseEventType'}
                    placeHolder={isLoading ? 'loadingWord' : 'chooseEventTypePlaceholder'}
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
                    mode='edit'
                    label={'numOfSeatsWord'} type={'text'} password={false}
                    loading={true} placeHolder={isLoading ? 'loadingWord' : 'numOfSeatsPlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.seatsNumber}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.seatsNumber && formikObj.errors.seatsNumber ? 
                        formikObj.errors.seatsNumber 
                        : null
                    }
                />

                <Input id={'slogan'} 
                    mode='edit'
                    label={'eventSloganWord'} type={'text'} password={false}
                    loading={true} placeHolder={isLoading ? 'loadingWord' : 'eventSloganPlaceholder'}
                    onChange={formikObj.handleChange} value={formikObj.values.slogan}
                    onBlur={formikObj.handleBlur}
                    ValidationError={formikObj.touched.slogan && formikObj.errors.slogan ? formikObj.errors.slogan : null}
                />

                <div className='col-span-2 max-[785px]:col-span-1'>
                    <Textarea id={'description'} 
                        label={'eventDescriptionWord'} 
                        placeHolder={isLoading ? 'loadingWord' : 'eventDescriptionPlaceholder'} 
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
                                    mode='edit'
                                    label={`agendaItemWord`} type={'text'} password={false}
                                    loading={true} placeHolder={isLoading ? 'loadingWord' : `agendaPlaceholderWord`}
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
                        {isUpdateLoading ? 
                            <PacmanLoader color='var(--salt-color-const)' size={8} speedMultiplier={1} />
                            : <>
                                <TfiReload className='text-xl' />
                                <p>{t('updateEventWord')}</p>
                            </>
                        }
                    </button>

                </div>

            </motion.form>

        </motion.section>

    </React.Fragment>

}
