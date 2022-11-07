import axios from "axios";
import { NextPage } from "next";
import { Session } from "next-auth";
import Email from "next-auth/providers/email";
// import { signIn, useSession } from "next-auth/react";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { OurStore, useAppDispatch } from '../modules/store'
import { login } from "../modules/reducers/authReducer";


interface LoginType {
    email: string
    password: string
}

const initialValues: LoginType = {
    email: 'naru3644@gmail.com',
    password: '12345678',
}

const Login: NextPage = (props: any) => {
    const [email, setEmail] = useState<string>("naru3644@gmail.com");
    const [password, setPassword] = useState<string>("12345678");
    const [sitekey, setSitekey] = useState<string>("");
    const recaptchaRef = useRef<any>();
    const router = useRouter()
    const loginState = useSelector((state: OurStore) => state.authReducer);
    const [isLogin, setIsLogin] = useState<boolean>(true);


    const dispatch = useAppDispatch();


    useEffect(() => {
        try {
            setSitekey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
        } catch (e) {
            setSitekey("");
        }
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await dispatch(login({ email: email, password: password }));
        if (loginState.isLogin) router.push('/search');
        else {
            setIsLogin(false);
        }
        // recaptchaRef.current.execute();

    }
    const onReCAPTCHAChange = (captchaCode: string) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        // Else reCAPTCHA was executed successfully so proceed with the 
        // alert
        // 캡챠에 성공했을 경우
        alert(`Hey, ${email}`);
    }
    const ReCAPTCHA_DOM = ReCAPTCHA as any;

    return (
        <div >
            <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 mx-50">
                <div className="w-full sm:max-w-md p-5 mx-auto">
                    <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <ReCAPTCHA_DOM
                            ref={recaptchaRef}
                            sitekey={sitekey}
                            size="normal"
                            onChange={onReCAPTCHAChange} /> */}
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
                                type="submit">Log In</button>
                        </div>
                        {
                            !isLogin ? <div>
                                <a href="#" className="text-sm text-red-600">Login is failed</a>
                            </div>
                                :
                                <div></div>
                        }
                        <div className="mt-6 text-center cursor-pointer">
                            <a className="underline" onClick={() => router.push('/account')}>Sign up for an account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;