import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbarWrap}>
      <ul className={styles.navbarContainer}>
        <li className={styles.title}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href="/contact">
            <a>Contact Us</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href="/boards">
            <a>게시판</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href="/boards">
            <a>로그인</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}