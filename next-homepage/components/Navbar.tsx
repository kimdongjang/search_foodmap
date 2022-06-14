import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css'

export default function Navbar() {
  return (
    <nav className='bg-gray-100'>
      <div className='max-w-6xl  mx-auto px-4'>
        <div className='flex jutify-between'>
          {/* x는 수평방향 조절, y는 수직방향 조절 */}
          <div className='flex space-x-4'>
            <div>
            <Link href="/">
              <a className='flex items-center py-5 px-2 text-gray-700 font-bold'>Home</a>
            </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/contact">
                <a className='py-5 px-2 text-gray-700 font-bold hover:text-gray-900'>Contact Us</a>
              </Link>
              <Link href="/boards">
                <a className='py-5 px-2 text-gray-700 font-bold hover:text-gray-900'>게시판</a>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <div className='py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300'>
              <Link href="/login">
                <a>로그인</a>
              </Link>
            </div>
          </div>
        </div>
      </div>    
    </nav>


    // <div className={styles.navbarWrap}>
    //   <ul className={styles.navbarContainer}>
    //     <li className={styles.title}>
    //       <Link href="/">
    //         <a>Home</a>
    //       </Link>
    //     </li>
    //     <li className={styles.title}>
    //       <Link href="/contact">
    //         <a>Contact Us</a>
    //       </Link>
    //     </li>
    //     <li className={styles.title}>
    //       <Link href="/boards">
    //         <a>게시판</a>
    //       </Link>
    //     </li>
    //     <li className={styles.title}>
    //       <Link href="/login">
    //         <a>로그인</a>
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
  )
}