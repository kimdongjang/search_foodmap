import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function () {
    const {data: session} = useSession();
    useEffect(() => {
        signIn();
    },[])
    return (
        <div>
            <p>/api/session</p>
            <iframe src="/api/session" />
            <h2>JSON Web Token</h2>
            <p>/api/jwt</p>
            <iframe src="/api/jwt" />
            {/* <button onClick={signin()}>로그인</button> */}
        </div>
    )
}