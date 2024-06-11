import * as React from 'react';
import {Description, Field, Fieldset, Input, Label, Legend, Select, Textarea} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";

const CreateDoctorModal = ({open, setOpen}) => {

    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 bg-white shadow-lg rounded-lg">
                    <div className="flex justify-end p-2" onClick={handleClose}>
                        <span
                            className="text-center pb-1 w-6 h-6 text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>

                        </span>
                    </div>
                    <div className="w-full">
                        <Fieldset className="space-y-6 bg-black/5 p-6 sm:p-10">
                            <Legend className="text-base/7 font-semibold text-black">Shipping details</Legend>
                            <Field>
                                <Label className="text-sm/6 font-medium text-black">Street address</Label>
                                <Input
                                    className={clsx(
                                        'mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                                    )}
                                />
                            </Field>
                            <Field>
                                <Label className="text-sm/6 font-medium text-black">Country</Label>
                                <Description className="text-sm/6 text-black/50">We currently only ship to North
                                    America.</Description>
                                <div className="relative">
                                    <Select
                                        className={clsx(
                                            'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
                                            // Make the text of each option black on Windows
                                            '*:text-black'
                                        )}
                                    >
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                        <option>United States</option>
                                    </Select>
                                    <ChevronDownIcon
                                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>
                            <Field>
                                <Label className="text-sm/6 font-medium text-black">Delivery notes</Label>
                                <Description className="text-sm/6 text-black/50">
                                    If you have a tiger, we'd like to know about it.
                                </Description>
                                <Textarea
                                    className={clsx(
                                        'mt-3 block w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                                    )}
                                    rows={3}
                                />
                            </Field>
                        </Fieldset>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateDoctorModal;