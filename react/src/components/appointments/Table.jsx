import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Table() {
    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);
    return (
        <section className='w-full justify-center flex flex-col gap-5'>

            <div className='w-fit  gap-5 flex items-center justify-end '>

                <div className='flex flex-col'>
                    <p className='text-[#0E82FD] text-xs '>
                        start with
                    </p>
                    <div
                        className="max-w-md mx-auto items-center relative border border-gray-300 rounded-lg  cursor-pointer flex">
                        <DatePicker
                            selected={startdate}
                            onChange={date => setstartdate(date)}
                            dateFormat="dd/MM/yyyy"
                            showPopperArrow={true}
                            className="block  px-5 py-2   w-full mt-1 outline-none cursor-pointer rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button type="button"
                                className=' pointer-events-none px-2 flex right-0 absolute items-center justify-center cursor-pointer'>
                            <img src="/assets/Calendar.svg" alt=""/>
                        </button>
                    </div>
                </div>

                <img src="/assets/Arrow_rtl.svg" alt=""/>


                <div className='flex flex-col'>
                    <p className='text-[#0E82FD] text-xs '>
                        end with
                    </p>
                    <div
                        className="max-w-md mx-auto border items-center  relative border-gray-300 rounded-lg  cursor-pointer flex">
                        <DatePicker
                            selected={enddate}
                            onChange={date => setenddate(date)}
                            dateFormat="dd/MM/yyyy"
                            showPopperArrow={true}
                            className="block  px-5 py-2  w-full mt-1 outline-none cursor-pointer rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button type="button"
                                className='pointer-events-none px-2 flex right-0  absolute items-center justify-center cursor-pointer'>
                            <img src="/assets/Calendar.svg" alt=""/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto rounded-lg ">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Patient
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Insurance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Test
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Technician
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Creator
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Timer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b text-nowrap ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            7:00 - 7:10
                        </th>
                        <td className="px-6 py-4 ">
                            Braha Marlam Roh
                        </td>
                        <td className="px-6 py-4">
                            Macabi
                        </td>
                        <td className="px-6 py-4">
                            Upper Abdomen General - Test Code 2705
                        </td>
                        <td className="px-6 py-4">
                            Valeria
                        </td>
                        <td className="px-6 py-4">
                            Hagana 16, Tel Aviv
                        </td>
                        <td className=" w-full flex items-center justify-center cursor-pointer px-6 py-4">
                            <img src="Communication_Phone.svg" alt=""/>
                        </td>
                        <td className="px-6 py-4">
                            Visited
                        </td>
                        <td className=" flex items-center justify-center px-6 py-4 text-[#FD4848]">
                            <img src="Calender_time.svg" alt=""/>
                            <p>05:54</p>
                        </td>
                        <td className=" px-6 py-4">
                            <div className=' cursor-pointer w-full flex items-center justify-center'>
                                <img src="Vistor.svg" alt=""/>
                            </div>

                        </td>
                    </tr>
                    <tr className="bg-white border-b text-nowrap ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            7:00 - 7:10
                        </th>
                        <td className="px-6 py-4 ">
                            Braha Marlam Roh
                        </td>
                        <td className="px-6 py-4">
                            Macabi
                        </td>
                        <td className="px-6 py-4">
                            Upper Abdomen General - Test Code 2705
                        </td>
                        <td className="px-6 py-4">
                            Valeria
                        </td>
                        <td className="px-6 py-4">
                            Hagana 16, Tel Aviv
                        </td>
                        <td className=" w-full flex items-center justify-center cursor-pointer px-6 py-4">
                            <img src="Midea_Airplay.svg" alt=""/>
                        </td>
                        <td className="px-6 py-4">
                            Visited
                        </td>
                        <td className=" flex items-center justify-center px-6 py-4 text-[#FD4848]">
                            <img src="Calender_time.svg" alt=""/>
                            <p>05:54</p>
                        </td>
                        <td className=" px-6 py-4">
                            <div className=' cursor-pointer w-full flex items-center justify-center'>
                                <img src="edit.svg" alt=""/>
                            </div>

                        </td>
                    </tr>


                    </tbody>
                </table>
            </div>
            <div className='w-full flex items-center justify-center'>
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <a href="#"
                               className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page"
                               className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>


        </section>
    )
}
