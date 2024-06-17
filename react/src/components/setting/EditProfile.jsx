import React from 'react'

export default function EditProfile() {
    return (
        <section className='w-full flex flex-col items-start gap-9 p-5 bg-white  pt-8  md:flex-row '>

            <div className='relative p-1  '>
                <img className='rounded-full w-[150px]  ' src="/assets/photo.svg" alt="" />
                <label htmlFor="upload" className='absolute top-20 right-0 cursor-pointer'>
                    <img src="/assets/edit_photo.svg" alt="" />
                </label>
                <input type="file" id="upload" className="hidden" />
            </div>



            <form className='w-full'>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="your_name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                        <input type="text" id="your_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required />
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@example.com" required />
                    </div>
                    <div>
                        <label for="dob" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
                        <input type="date" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                        <label for="permanent_address" className="block mb-2 text-sm font-medium text-gray-900">Permanent Address</label>
                        <input type="text" id="permanent_address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123 Main St" required />
                    </div>
                    <div>
                        <label for="postal_code" className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
                        <input type="text" id="postal_code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="12345" required />
                    </div>
                    <div>
                        <label for="username" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                        <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="johndoe123" required />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                    </div>
                    <div>
                        <label for="present_address" className="block mb-2 text-sm font-medium text-gray-900">Present Address</label>
                        <input type="text" id="present_address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="456 Oak St" required />
                    </div>
                    <div>
                        <label for="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                        <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="New York" required />
                    </div>
                    <div>
                        <label for="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                        <input type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="United States" required />
                    </div>
                </div>
                <div className='w-full flex items-center justify-end'>
                    <button type="submit" className="text-white py-2 px-20 bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto   text-center">Save</button>
                </div>

            </form>



        </section>
    )
}