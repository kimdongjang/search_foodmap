

import { NextPage } from "next";
import { Session } from "next-auth";
// import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Login: NextPage = (props: any) => {
    return (
        <div >
            <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div className="w-full sm:max-w-md p-5 mx-auto">
                    <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
                    <form>
                    <div className="mb-4">
                        <label className="block mb-1" >Email-Address</label>
                        <input id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" >Password</label>
                        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                        <input id="remember_me" type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
                        <label className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
                        </div>
                        <a href="#" className="text-sm"> Forgot your password? </a>
                    </div>
                    <div className="mt-6">
                        <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Sign In</button>
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