import Head from "next/head"
import styles from '../styles/header.module.css'
import Navbar from "./Navbar"


export default function Header() {
    return (
        <div >
            <Head>
                <title>주변 푸드 찾기</title>
            </Head>
            <Navbar></Navbar>
        </div>
    )
}