import React from 'react';
import {
    BarChart, Bar, XAxis,
    CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function Chart() {

    const data = [

        {name: 'aug', uv: 3000},
        {name: 'seb', uv: 2000},
        {name: 'oc', uv: 0},
        {name: 'nov', uv: 1890},
        {name: 'dec', uv: 2390},
        {name: 'jan', uv: 3490},

    ];

    return (
        <section className='bg-white p-5  w-full flex flex-col gap-4 rounded-xl h-full items-center justify-center'>
            <div style={{width: '100%'}}>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        width={500}
                        height={200}
                        data={data}
                        border="0"
                    >
                        <CartesianGrid strokeDasharray=""/>
                        <XAxis dataKey="name"/>
                        <Bar dataKey="uv" fill="#16DBCC" radius={[10, 10, 10, 10]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}
