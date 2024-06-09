import React from 'react'

export default function Search() {
  const  handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value)
      }
    return (
        <form className='rounded-full px-2 py-1 w-3/4 border border-[#D5D5D5] gap-2 flex items-center' action="">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
            <g opacity="0.5">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.69366 12.5352C12.4235 11.3751 13.696 8.2216 12.5358 5.49177C11.3757 2.76193 8.22221 1.48945 5.49237 2.6496C2.76253 3.80975 1.49005 6.96321 2.6502 9.69305C3.81036 12.4229 6.96382 13.6954 9.69366 12.5352Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.3904 11.3896L15.5557 15.5556" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
        <input onChange={handleSubmit} className='w-full outline-none placeholder-gray-400' type="text" placeholder='Search' />
    </form>
    
    )
}
