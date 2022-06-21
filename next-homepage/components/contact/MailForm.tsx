import React, { DetailedHTMLProps, FormEventHandler, FormHTMLAttributes, useEffect, useRef, useState } from "react";
import emailjs, { init } from '@emailjs/browser';
// import './mailForm.module.css'

type Props = {};

type EmailData = {
    name: string;
    subject: string;
    message: string;
}

export default function MailForm(props: any) {
    useEffect(() => { init("0Cv9lbuoYp-3kSV-d") }, [])

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: EmailData = { name: name, subject: subject, message: message }

        emailjs.sendForm('gieun_test_mail', 'template_vlicnna', e.target as HTMLFormElement, '0Cv9lbuoYp-3kSV-d').
            then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form className="contact__form" onSubmit={sendEmail} >
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]" >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                    </div>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@domain.com"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Enter your subject"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Message
                        </label>
                        <textarea
                            rows={4}
                            name="message"
                            id="message"
                            placeholder="Type your message"
                            className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        ></textarea>
                    </div>

                    <button className='py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300'>Send Message</button>
                    {/* <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">Send Message</button> */}
                </form >
            </div >
        </div>
    )
}
