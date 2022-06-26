import type { NextPage } from 'next'
import Head from 'next/head'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlider from '../components/ImageSlider'
import Navbar from '../components/Navbar'
import { Product } from '../interfaces/Product'
import { productsActions, ProductState } from '../modules/reducers/productReducer'
import styles from '../styles/index.module.css'

import dynamic from 'next/dynamic'


import Router from "next/router";
import NProgress from "nprogress";
import Link from 'next/link'
import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import { createImportSpecifier } from 'typescript'

// export async function getStaticProps() {
//   // 외부 API Endpoint로 Call해서 Post로 정보를 가져온다.
//   // const res = await fetch("https://.../posts");
//   // const posts = await res.json();
//   const url: string = "/images/image1.jpg"

//   // posts 데이터가 담긴 prop를 빌드 시간에 Blog 컴포넌트로 전달한다.
//   return {
//     props: {
//       url
//     }
//   };
// }

export async function getServerSideProps(context: any) {
  const url: string = "/images/image1.jpg"
  console.log(process.env.SERVER_DOMAIN)


  return {
    props: {
      url: url
    },
  }
}



const Index: NextPage = (props: any) => {
  console.log(props);
  console.log(
    "d", process.env.DESTINATION_URL,
    "pd", process.env.NEXT_PUBLIC_DESTINATION_URL,
    "dd", process.env.DEVELOPMENT_DESTINATION_URL,
    "npdd", process.env.NEXT_PUBLIC_DEVELOPMENT_DESTINATION_URL,
    "pd", process.env.PRODUCTION_DESTINATION_URL,
    "nppd", process.env.NEXT_PUBLIC_PRODUCTION_DESTINATION_URL);
  const dispatch = useDispatch();
  const data: Product = useSelector((state: any) => state.productReducer.data)
  const images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
  const tweet_eque_id: string = "1455546852137480196"

  const topRef = useRef(null); // top으로 올리는 버튼
  const [showTopButton, setShowTopButton] = useState(false);
  const displayAfter = 600;

  const [visitor, setVisitor] = useState<number>(0);

  // 처음 실행되었을떄의 처리
  useEffect(() => {

    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    TweetContainerInit();

    async function get() {
      try {
        const result = await axios.post("/redis/visit");
        console.log(result.data)
        if (result) setVisitor(result.data)
      }
      catch (e) {

      }
    }
    get();

    dispatch(productsActions.getProducts());


    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const pushEvent = useCallback(() => {
    dispatch(productsActions.getProducts());
  }, [])

  const TweetContainerInit = () => {
    const anchor = document.createElement("a");
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute("data-chrome", "nofooter");
    anchor.setAttribute("sourceType", "profile");
    anchor.setAttribute("screenName", "VHZ_EQue");
    anchor.setAttribute("data-height", "400");
    anchor.setAttribute("href", "https://twitter.com/VHZ_EQue");
    document.getElementsByClassName("twitter-timeline")[0].appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.getElementsByClassName("twitter-timeline")[0].appendChild(script);
  }


  console.log("타임아웃 전")
  setTimeout(() => { console.log("타임아웃 후") }, 5000)


  return (
    <div ref={topRef}>
      <TopButton displayAfter={0} target={topRef}>TOP</TopButton>

      <div className='plex justify-center items-center border-2 ring-2 ' >
        <Image src="/images/test1.jpg" layout="responsive" width={1200} height={700}></Image>
      </div>
      <div className='plex justify-center items-center border-2 ring-2' >
        <Image src="/images/test2.jpg" layout="responsive" width={1200} height={700}></Image>
      </div>

      <div className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1'>
        <p></p>
      </div>
      <div className="inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">

        <div>
          <Link href="/about">
            <a style={{ float: "left" }}>about 페이지로 이동</a>
          </Link>
        </div>
        <div className={styles.twitterContainer}>
          <div className="twitter-timeline" data-height="50%"></div>
        </div>

        <div>
          <button onClick={pushEvent}>Push Button</button>
          <img src={data?.message} alt="test" width={500} height={500}></img>
          <div>{data?.message}
          </div>
        </div>
      </div >
      <div className='py-32 text-center'>
        {/* font-size:2.25rem, line-height: 2.5rem, extra-large */}
        <div className='text-4xl font-extrabold'>
          방문자 : {visitor}
        </div>
      </div>
    </div >

  )
}

function TopButton({ displayAfter, target }: any) {
  const [showButton, setShowButton] = useState(true);
  const handleShowButton = () => {
    if (!showButton && window.scrollY > displayAfter) {
      setShowButton(true);
      return;
    }
    if (!showButton && window.scrollY <= displayAfter) {
      setShowButton(false);
      return;
    }
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      console.log("window undefiend")
      return window.addEventListener("scroll", handleShowButton);
    }
  });

  const scrollToRef = (target: any) => {
    window.scrollTo({
      top: target.current.offsetTop,
      behavior: "smooth"
    });
  };
  if (showButton) {
    return <button className="fixed bottom-10 left-5 w-10 h-10 bg-green-300 ring-2" onClick={() => scrollToRef(target)}>TOP</button>;
  }
  return <div />;
}


export default Index;


