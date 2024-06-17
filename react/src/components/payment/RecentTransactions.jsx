import React from 'react'

export default function RecentTransactions() {
  return (
    <section className='w-full flex flex-col gap-9'>
      <h1 className='font-nunito-sans text-2xl font-bold'>
        Recent Transactions
      </h1>
      <h1 className=' text-blue-700 pb-1 w-fit font-nunito-sans text-lg font-bold border-b border-blue-700'>
      All Transactions
      </h1>




      <div className="relative overflow-x-auto rounded-lg p-5 bg-white ">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
          <thead className="text-xs text-blue-700  text-nowrap border border-x-0 border-t-0   uppercase bg-white p-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Card
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Receipt
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-nowrap ">
              <th scope="row" className=" flex items-center  gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <img className='w-5 h-5' src="/assets/arrow_up.svg" alt="" />
                <p>Spotify Subscription</p>
                
              </th>
              <td className="px-6 py-4">
              #12548796
              </td>
              <td className="px-6 py-4">
              Shopping
              </td>
              <td className="px-6 py-4">
                $1234 ****
              </td>
              <td className="px-6 py-4">
              28 Jan, 12.30 AM
              </td>
              <td className=" text-red-500 px-6 py-4">
             <p> -$2,500</p>
              </td>
              <td className="   px-6 py-4">
             <p className='border border-[#0E82FD] px-2 py-1 rounded-full'> Download</p>
              </td>
            </tr>
            <tr className="bg-white ">
              <th scope="row" className=" flex items-center  gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <img className='w-5 h-5' src="/assets/arrow_down.svg" alt="" />
                <p>Spotify Subscription</p>
                
              </th>
              <td className="px-6 py-4">
              #12548796
              </td>
              <td className="px-6 py-4">
              Shopping
              </td>
              <td className="px-6 py-4">
                $1234 ****
              </td>
              <td className="px-6 py-4">
              28 Jan, 12.30 AM
              </td>
              <td className=" text-blue-500 px-6 py-4">
             <p> -$2,500</p>
              </td>
              <td className="   px-6 py-4">
             <p className='border border-[#0E82FD] px-2 py-1 rounded-full'> Download</p>
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>

    </section>
  )
}
