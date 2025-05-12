import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Title from './../../Components/Title/Title';
import Table from '../../Components/Table/Table';
import warningSVG from '../../assets/JSON/warning.json';
import WarnPopUp from './../../Components/Pop-Up/WarnPopUp';

export default function AdminPanel() {

    const {t} = useTranslation();

    // ====== ban-officer-pop-up ====== //

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOfficer, setSelectedOfficer] = useState(null);

    const handleBanClick = (officer) => {
        setSelectedOfficer(officer);
        setIsModalOpen(true);
    };

    const handleConfirmBan = () => {
        if (selectedOfficer) {
            // Your existing ban logic here
            setIsModalOpen(false);
            setSelectedOfficer(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOfficer(null);
    };

    return <React.Fragment>

        <WarnPopUp
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('banOfficerTitle')}
            message={t('banOfficerMessage')}
        />

        <section className='w-full px-[4.5%] py-10 pt-[8.05rem] flex flex-col gap-10'>

            <div className='w-full flex items-center justify-between flex-wrap gap-5'>

                <Title title={'eventsManagementWord'} />

                <Link to={'add-event'} className='
                    px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                    text-base text-[var(--white-color)] font-medium cursor-pointer
                '>
                    <IoIosAddCircleOutline className='text-xl' />
                    <p>{t('addEventWord')}</p>
                </Link>

            </div>

            <div className='
                w-full rounded-md bg-[var(--salt-color)] shadow-[0_0px_10px_var(--light-black-opacity-color)] 
                border border-solid border-[var(--gray-color-3)] overflow-x-auto hidden_scroll
            '>

                <Table
                    columns={['eventWord', 'dateWord', 'locationWord', 'statusWord', 'viewEventWord']}
                    actions={true} emptyMessage="noOfficersYet" emptyIcon={warningSVG}
                    data={[]} isLoading={false} isError={false}
                    onActionClick={(officer) => (
                        <div className='flex items-center justify-center gap-2.5'>
                            <Link to={`update-officer-data/${officer.id}`} className='
                                p-2.5 rounded-md bg-[var(--gray-color-3)]
                                text-[var(--blue-color)] cursor-pointer duration-300
                                hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                            '><FiEdit /></Link>

                            <button 
                                onClick={() => handleBanClick(officer)}
                                className='
                                    p-2.5 rounded-md bg-[var(--gray-color-3)]
                                    text-[var(--red-color)] cursor-pointer duration-300
                                    hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                            '><IoBanSharp /></button>
                        </div>
                    )}
                />

            </div>

        </section>

    </React.Fragment>

}
