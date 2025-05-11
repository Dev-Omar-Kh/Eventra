import React from 'react';
import TrButton from '../Translate/TrButton';
import Register from './Register';
import DmButton from '../Dark-Mode/DmButton';

export default function Actions() {

    return <React.Fragment>

        <div className='flex items-center gap-2.5 max-[881px]:flex-col'>

            <TrButton />

            <Register />

            <DmButton />

        </div>

    </React.Fragment>


}
