import React from 'react';
import { LineChart, Line, XAxis,
    YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer } from 'recharts';


export default function SalesDetails() {

  const data = [
    { name: '0', uv: 0 },
    { name: '5k', uv: 3000 },
    { name: '10k', uv: 2000 },
    { name: '15k', uv: 0 },
    { name: '20k', uv: 1890 },
    { name: '25k', uv: 2390 },
    { name: '30k', uv: 3490 },
    { name: '35k', uv: 3490 },
    { name: '40k', uv: 3490 },
    { name: '45k', uv: 3490 },
    { name: '50k', uv: 3490 },
    { name: '55k', uv: 3490 },
    { name: '60k', uv: 3490 },
  ];
  return (
    <section className='bg-white p-3  flex flex-col gap-4 rounded-lg'>
      <h1 className='font-nunito-sans text-2xl font-bold '>
        Sales Details
      </h1>
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line connectNulls type="monotone" dataKey="uv" stroke="#4379EE" fill="#4379EE" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </section>
  )
}
