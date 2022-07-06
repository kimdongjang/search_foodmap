import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { useState } from 'react';
import classNames from "classnames";
import styles from './Navbar.module.scss'

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <nav className={styles.navbarSection}>
      <div className={styles.navbarSection__navigation}>
          {/* x는 수평방향 조절, y는 수직방향 조절 */}
          <div className={styles.navbarSection__navigation__inner}>
            <div>
              <Link href="/">
                <a className={styles.navbarSection__navigation__innerContent}>Home</a>
              </Link>
            </div>
            {/* sm크기 일경우엔 안보이고, md크기 부터는 display:flex 적용 */}
            <div className={styles.navbarSection__navigation__innerHidden}>
              <Link href="/contact">
                <a className={styles.navbarSection__navigation__innerContent}>Contact Us</a>
              </Link>
              <Link href="/boards">
                <a className={styles.navbarSection__navigation__innerContent}>게시판</a>
              </Link>
            </div>
          </div>
          <div className={styles.navbarSection__navigation__innerHidden}>
            <div className={styles.navbarSection__navigation__innerButton}>
              <Link href="/login">
                <a>로그인</a>
              </Link>
            </div>
          </div>
          <div className='md:hidden flex items-center'>
            {!menuToggle ? (
              <AiOutlineMenu onClick={() => setMenuToggle(!menuToggle)}
                className="hover:cursor-pointer" />
            ) : (<AiOutlineClose onClick={() => setMenuToggle(!menuToggle)}
              className="hover:cursor-pointer" />)}
          </div>
        </div>

      {/* mobile menu items */}
      <div className={classNames("md:hidden", { hidden: !menuToggle })}>
        <Link href="/contact">
          <a className='block py-2 px-4 text-sm hover:bg-gray-200'>Contact Us</a>
        </Link>
        <Link href="/boards">
          <a className='block py-2 px-4 text-sm hover:bg-gray-200'>게시판</a>
        </Link>
        <Link href="/login">
          <a className='block py-2 px-4 text-sm bg-yellow-400 hover:bg-yellow-300'>로그인</a>
        </Link>

      </div>
    </nav>
  )
}