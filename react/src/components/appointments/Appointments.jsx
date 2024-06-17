import React, { useState } from 'react';
import Search from './Searchpage';
import Table from './Table';
import CreateAppointment from './CreateAppointment';

export default function Appointments() {
    const [add, setAdd] = useState(0);

    const changePages = (index) => {
        setAdd(index);
    };

    return (
        <section className='py-6 w-full gap-10 px-5 h-full flex flex-col'>

            {add === 0 && (
                <>
                    <h1 className='font-nunito-sans text-2xl font-bold'>
                        Appointments
                    </h1>
                    <Search add={changePages} />
                    <Table />
                </>
            )}

            {add === 1 && <CreateAppointment add={changePages} />}
        </section>
    );
}
