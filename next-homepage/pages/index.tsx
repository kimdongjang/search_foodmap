import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlider from '../components/ImageSlider'
import Navbar from '../components/Navbar'
import { Product } from '../interfaces/Product'
import { productsActions, ProductState } from '../modules/reducers/productReducer'
import styles from '../styles/index.module.css'

import ExImage from '../public/images/image1.jpg';
import Image from 'next/image'
import Link from 'next/link'
import axios, {  AxiosResponse } from 'axios'

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
    "dd" ,process.env.DEVELOPMENT_DESTINATION_URL,
    "npdd" ,process.env.NEXT_PUBLIC_DEVELOPMENT_DESTINATION_URL,
    "pd", process.env.PRODUCTION_DESTINATION_URL,
    "nppd" ,process.env.NEXT_PUBLIC_PRODUCTION_DESTINATION_URL);
  const dispatch = useDispatch();
  const data: Product = useSelector((state: ProductState) => state.data)
  const images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
  const tweet_eque_id: string = "1455546852137480196"

  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    TweetContainerInit();
   
    async function get() {
      const result: AxiosResponse<any, any> = await axios.post("/redis/visit");
      console.log(result.data)
      if (result) setVisitor(result.data)
    }
    get();

    dispatch(productsActions.getProducts());
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

  return (
    <div >
      {/* padding Y axis 8rem, text-aling: center */}
      <div className='py-32 text-center'>
        {/* font-size:2.25rem, line-height: 2.5rem, extra-large */}
        <div className='text-4xl font-extrabold'>
          방문자 : {visitor}          
        </div>
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
        {/* <a className="twitter-timeline"
          href="https://twitter.com/VHZ_EQue">
        Tweets by VHZ_EQue
        </a> */}
        {/* <div>
        <ImageSlider data={images} />

      </div> */}
        <div>
          <button onClick={pushEvent}>Push Button</button>
          <img src={data?.message} alt="test" width={500} height={500}></img>
          <div>{data?.message}
          </div>
        </div>
      </div >
    </div>

  )
}



export default Index;


