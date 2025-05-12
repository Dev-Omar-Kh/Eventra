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

export default function AddEvent() {

    const {t} = useTranslation();

    const [agendaItems, setAgendaItems] = useState(['', '']);

    const addAgendaItem = () => {
        setAgendaItems(prevItems => {
            if (prevItems.length < 15) {
                return [...prevItems, ''];
            }
            return prevItems;
        });
    };

    const removeAgendaItem = () => {
        setAgendaItems(prevItems => {
            if (prevItems.length > 1) {
                return prevItems.slice(0, -1);
            }
            return prevItems;
        });
    };

    const filtersTypes = [
        'conferencesWord',
        'showsPerformancesWord',
        'exhibitionsWord',
        'festivalsWord',
        'coursesWorkshopsWord',
        'musicConcertsWord',
    ];

    return <React.Fragment>

        {/* <AnimatePresence>
            {successMsg && <ResponsePage type={true} msg={successMsg} />}
        </AnimatePresence>

        <AnimatePresence>
            {errMsg && <ResponsePage type={false} msg={errMsg} />}
        </AnimatePresence> */}

        <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'>

            <Title title={'addEventWord'} />

            <form className='
                rounded-md bg-[var(--salt-color)] shadow-[0_0px_10px_var(--light-black-opacity-color)] 
                border border-solid border-[var(--gray-color-3)] py-5 px-[2.25%] grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1
            '>

                <div className='col-span-2 flex flex-col gap-2.5 max-[785px]:col-span-1'>
                    {/* {formikObj.values.img_profile && <img 
                        className='w-16 h-16 rounded-md object-cover' 
                        src={formikObj.values.img_preview} alt="pfpImg" 
                    />} */}
                    <ImgInput 
                        label={'uploadImageWord'} 
                        // value={formikObj.values.img_profile} 
                        // onChange={(event) => {
                        //     const file = event.target.files[0];
                        //     if (file) {
                        //         const previewUrl = URL.createObjectURL(file);
                        //         formikObj.setFieldValue('img_profile', file);
                        //         formikObj.setFieldValue('img_preview', previewUrl);
                        //     }
                        // }}
                        // onBlur={formikObj.handleBlur}
                    />
                </div>

                <Input 
                    id={'eventName'} label={'eventNameWord'} type={'text'} password={false}
                    loading={true} placeHolder={'eventNamePlaceholder'}
                />

                <Input 
                    id={'location'} label={'locationWord'} type={'text'} password={false}
                    loading={true} placeHolder={'locationPlaceholder'}
                />

                <ListInput 
                    id={'rank'} label={'chooseEventType'}
                    placeHolder={'chooseEventTypePlaceholder'}
                    options={filtersTypes}
                    // onChange={formikObj.handleChange} value={formikObj.values.rank}
                    // onBlur={formikObj.handleBlur}
                />

                <DateInput 
                    id={'date'} label={'eventDateWord'}
                />

                <Input 
                    id={'numOfSeats'} label={'numOfSeatsWord'} type={'text'} password={false}
                    loading={true} placeHolder={'numOfSeatsPlaceholder'}
                />

                <Input 
                    id={'eventSlogan'} label={'eventSloganWord'} type={'text'} password={false}
                    loading={true} placeHolder={'eventSloganPlaceholder'}
                />

                <div className='col-span-2 max-[785px]:col-span-1'>
                    <Textarea 
                        id={'description'} label={'eventDescriptionWord'} 
                        placeHolder={'eventDescriptionPlaceholder'} 
                        // value={formikObj.values.notes}
                        // onChange={formikObj.handleChange} onBlur={formikObj.handleBlur}
                        // error={formikObj.touched.notes && formikObj.errors.notes ? formikObj.errors.notes : null}
                    />
                </div>

                <div className='
                    col-span-2 p-5 rounded-md bg-[var(--gray-color-3)] max-[785px]:gap-2.5 my-2.5
                    flex flex-col gap-5 duration-300 max-[785px]:col-span-1 max-[785px]:p-2.5
                '>

                    <div className='grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1'>

                        <AnimatePresence>

                            {agendaItems.map((_, idx) => <motion.div 
                                key={idx}
                                variants={Animations.scaleVariants}
                                initial='hidden' animate='visible' exit={'exit'}
                            >

                                <Input 
                                    id={'agenda'} label={`agendaItemWord`} type={'text'} password={false}
                                    loading={true} placeHolder={`agendaPlaceholderWord`}
                                />

                            </motion.div>)}

                        </AnimatePresence>

                    </div>

                    <div className='w-full flex items-center justify-end gap-2.5'>

                        <button 
                            type='button'
                            onClick={removeAgendaItem}
                            disabled={agendaItems.length === 1}
                            className={`
                                p-2.5 rounded-md bg-[var(--gray-color-1)] text-[var(--red-color)] text-2xl
                                ${agendaItems.length === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                            `}
                        ><IoIosRemoveCircleOutline /></button>

                        <button 
                            type='button'
                            onClick={addAgendaItem}
                            disabled={agendaItems.length >= 15}
                            className={`
                                p-2.5 rounded-md bg-[var(--blue-color)] text-[var(--salt-color)] 
                                dark:text-[var(--black-color-2)] text-2xl
                                ${agendaItems.length >= 15 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                            `}
                        ><IoIosAddCircleOutline /></button>

                    </div>

                </div>

                <div className='col-span-2 max-[785px]:col-span-1'>

                    <button className='
                        w-full py-2.5 px-5 rounded-md bg-[var(--blue-color)] 
                        text-[var(--salt-color)] font-medium dark:text-[var(--black-color-2)]
                        flex items-center justify-center gap-2.5 cursor-pointer
                    '>
                        <IoIosAddCircleOutline className='text-2xl' />
                        <p>{t('addEventWord')}</p>
                    </button>

                </div>

            </form>

        </section>

    </React.Fragment>

}
