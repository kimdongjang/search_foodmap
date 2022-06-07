import Head from "next/head"
import Navbar from "./Navbar";
import styles from '../styles/header.module.css'


export default function Header() {
    return (<div className={styles.headerWrap}>
        <Head>
            <title>Hello</title>
        </Head>
        <Navbar></Navbar>
    </div>
    )
}