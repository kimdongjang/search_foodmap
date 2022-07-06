import Head from "next/head"
import styles from '../styles/header.module.css'
import Navbar from "./navbar"


export default function Header() {
    return (<div className={styles.headerWrap}>
        <Head>
            <title>웹 타이틀 이름</title>
        </Head>
        <Navbar></Navbar>
    </div>
    )
}