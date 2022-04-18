import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import {NextApiRequest} from "next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // 로그인 인증 방식 설정하기
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            },            
          }),
    ],
})