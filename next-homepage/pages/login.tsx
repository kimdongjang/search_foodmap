

import { NextPage } from "next";
import { Session } from "next-auth";
// import { signIn, useSession } from "next-auth/react";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Login: NextPage = (props: any) => {
    const [email, setEmail] = useState("naru3644@gmail.com");
    const [password, setPassword] = useState("12345678");
    const recaptchaRef = useRef<any>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit")
        console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
        event.preventDefault();
        recaptchaRef.current.execute();
    }
    const onReCAPTCHAChange = (captchaCode: string) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        // Else reCAPTCHA was executed successfully so proceed with the 
        // alert
        alert(`Hey, ${email}`);
        // Reset the reCAPTCHA so that it can be executed again if user 
        // submits another email.
        recaptchaRef.current.reset();
    }
    return (
        <div >
            <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 mx-50">
                <div className="w-full sm:max-w-md p-5 mx-auto">
                    <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
                    <form onSubmit={handleSubmit}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={onReCAPTCHAChange} />
                        <div className="mb-4">
                            <label className="block mb-1" >Email-Address</label>
                            <input type="text" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1" >Password</label>
                            <input type="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
                                <label className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
                            </div>
                            <a href="#" className="text-sm"> Forgot your password? </a>
                        </div>
                        <div className="mt-6">
                            <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                                type="submit">Sign In</button>
                        </div>
                        <div className="mt-6 text-center">
                            <a href="#" className="underline">Sign up for an account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    // const {data: session} = useSession();
    // useEffect(() => {
    //     signIn();
    // },[])
    // return (
    //     <div>
    //         <p>/api/session</p>
    //         <iframe src="/api/session" />
    //         <h2>JSON Web Token</h2>
    //         <p>/api/jwt</p>
    //         <iframe src="/api/jwt" />
    //         {/* <button onClick={signin()}>로그인</button> */}
    //     </div>
    // )
}

export default Login;