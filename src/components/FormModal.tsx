import {Button, Dialog, DialogPanel, DialogBackdrop} from "@headlessui/react";
import {Record} from "@/model/Record";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormModal = ({ isOpen, setIsOpen, onChange }: {isOpen: boolean, setIsOpen: (data: boolean) => void, onChange: (record: Record) => void }) => {
    const validationSchema = Yup.object({
        amountSpent: Yup.number()
            .required('Amount Spent is required')
            .min(0, 'Amount cannot be negative'),
        roas: Yup.number()
            .required('ROAS is required')
            .min(0, 'ROAS cannot be negative'),
        ctr: Yup.number()
            .required('CTR is required')
            .min(0, 'CTR cannot be negative'),
        cpm: Yup.number()
            .required('CPM is required')
            .min(0, 'CPM cannot be negative'),
        hookRate: Yup.number()
            .required('Hook Rate is required')
            .min(0, 'Hook Rate cannot be negative'),
        messageConversationRate: Yup.number()
            .required('Message Conversation Rate is required')
            .min(0, 'Message Conversation Rate cannot be negative'),
    });

    const formik = useFormik<Record>({
        initialValues: {
            amountSpent: 0,
            roas: 0,
            ctr: 0,
            cpm: 0,
            hookRate: 0,
            messageConversationRate: 0,
        },
        validationSchema,
        onSubmit: (values) => {
            onChange(values);
        },
    });

    return <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-gray-100 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                    <div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">Amount Spent</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input id={'amountSpent'} onChange={formik.handleChange} value={formik.values.amountSpent} type="number" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">ROAS</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input id={'roas'} onChange={formik.handleChange} value={formik.values.roas} type="number" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">CPM</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input id={'cpm'} onChange={formik.handleChange} value={formik.values.cpm} type="number" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">CTR</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input id={'ctr'} onChange={formik.handleChange} value={formik.values.ctr} type="number" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">Hook Rate</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input id={'hookRate'} onChange={formik.handleChange} value={formik.values.hookRate} type="number" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">Message Conversation Rate</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input id={'messageConversationRate'} onChange={formik.handleChange} value={formik.values.messageConversationRate} type="number" className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-4">
                                <Button
                                    type={'submit'}
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
}

export default FormModal;