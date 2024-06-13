import {
    Menu, MenuButton, MenuItem, MenuItems, Transition, Checkbox
} from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon, CheckIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
} from '@heroicons/react/16/solid'
import {useState} from "react";
import {Link} from "react-router-dom";

const TableHeader = () => {

    const [enabled, setEnabled] = useState(true);
    const [enabled2, setEnabled2] = useState(true);

    return (
            <div className="max-w-screen-xl w-full">
                <div className="relative bg-white shadow-md sm:rounded-lg">
                    <div
                        className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search"
                                           className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                           placeholder="Search" required=""/>
                                </div>
                            </form>
                        </div>
                        <div
                            className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                            <Link to="/doctors/create-doctor"
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd"
                                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                                </svg>
                                Add Doctor
                            </Link>
                            <div className="flex items-center w-full space-x-3 md:w-auto">
                                <Menu>
                                    <MenuButton
                                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                                        <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor"
                                             viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                        </svg>
                                        Options
                                    </MenuButton>
                                    <Transition
                                        enter="transition ease-out duration-75"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            anchor="bottom"
                                            className="w-52 origin-top-right rounded-xl border border-black/5 bg-black/5 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                        >
                                            <MenuItem>
                                                <button
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                    <PencilIcon className="size-4 fill-black/30"/>
                                                    Edit
                                                    <kbd
                                                        className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘E</kbd>
                                                </button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                    <Square2StackIcon className="size-4 fill-black/30"/>
                                                    Duplicate
                                                    <kbd
                                                        className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘D</kbd>
                                                </button>
                                            </MenuItem>
                                            <div className="my-1 h-px bg-black/5"/>
                                            <MenuItem>
                                                <button
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                    <ArchiveBoxXMarkIcon className="size-4 fill-black/30"/>
                                                    Archive
                                                    <kbd
                                                        className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘A</kbd>
                                                </button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                    <TrashIcon className="size-4 fill-black/30"/>
                                                    Delete
                                                    <kbd
                                                        className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘D</kbd>
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>

                                <Menu>
                                    <MenuButton
                                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                                        <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor"
                                             viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                        </svg>
                                        Filter
                                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                        </svg>
                                    </MenuButton>
                                    <Transition
                                        enter="transition ease-out duration-75"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            anchor="bottom"
                                            className="w-52 origin-top-right rounded-xl border border-black/5 bg-black/5 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                        >
                                            <MenuItem>
                                                <div className="flex justify-items-center">
                                                    <Checkbox
                                                        checked={enabled}
                                                        onChange={setEnabled}
                                                        className="flex size-5 rounded-md bg-black/10 p-1 mr-2 ml-3 ring-1 ring-balck/15 ring-inset data-[checked]:bg-blue-400"
                                                    >
                                                        <CheckIcon
                                                            className={`${!enabled ? "hidden" : ""} size-4 fill-black group-data-[checked]:block`}/>
                                                    </Checkbox>
                                                    <span>Name</span>
                                                </div>
                                            </MenuItem>
                                            <MenuItem>
                                                <div className="flex justify-items-center">
                                                    <Checkbox
                                                        checked={enabled2}
                                                        onChange={setEnabled2}
                                                        className="flex size-5 rounded-md bg-black/10 p-1 mr-2 ml-3 ring-1 ring-balck/15 ring-inset data-[checked]:bg-blue-400"
                                                    >
                                                        <CheckIcon
                                                            className={`${!enabled2 ? "hidden" : ""} size-4 fill-black group-data-[checked]:block`}/>
                                                    </Checkbox>
                                                    <span>Special</span>
                                                </div>
                                            </MenuItem>

                                            <div className="my-1 h-px bg-black/5"/>
                                            <MenuItem>
                                                <button
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                    <ArchiveBoxXMarkIcon className="size-4 fill-black/30"/>
                                                    Archive
                                                    <kbd
                                                        className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘A</kbd>
                                                </button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                    <TrashIcon className="size-4 fill-black/30"/>
                                                    Delete
                                                    <kbd
                                                        className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘D</kbd>
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TableHeader;