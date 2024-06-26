import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export default function Calendar() {

    return (
        <section
            className='p-3 flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col gap-4 bg-white rounded-lg shadow-md drop-shadow'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
        </section>

    )
}
