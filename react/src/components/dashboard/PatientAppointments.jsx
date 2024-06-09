import React, { useState } from 'react';


export default function PatientAppointments() {

    return (
        <section className='py-9 w-full flex flex-col gap-9 bg-white p-3 rounded-lg'>
            <div className='w-full flex flex-col  justify-between items-start gap-3 md:flex-row '>
                <h1 className='font-nunito-sans text-2xl font-bold  '>
                    Patient_Appointments
                </h1>
                <form className=" ">
                    <select id="months" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Choose a month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </form>

            </div>










           




            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Patient Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date - Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Piece
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                -
                            </th>
                            <td className="px-6 py-4">
                                -
                            </td>
                            <td className="px-6 py-4">
                                -
                            </td>
                            <td className="px-6 py-4">
                                -
                            </td>
                            <td className="px-6 py-4">
                                -
                            </td>
                            <td className="px-6 py-4">
                                -
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>


        </section>

    )
}
