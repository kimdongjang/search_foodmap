import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlider from '../components/ImageSlider'
import Navbar from '../components/Navbar'
import { Product } from '../interfaces/Product'
import { productsActions, ProductState } from '../modules/reducers/productReducer'
import styles from '../styles/index.module.css'

import ExImage from '../public/images/image1.jpg';
import Image from 'next/image'
import Link from 'next/link'

export async function getStaticProps() {
  // 외부 API Endpoint로 Call해서 Post로 정보를 가져온다.
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();
  const url: string = "/images/image1.jpg"

  // posts 데이터가 담긴 prop를 빌드 시간에 Blog 컴포넌트로 전달한다.
  return {
    props: {
      url
    }
  };
}



const Index: NextPage = (props: any) => {
  console.log(props);
  const dispatch = useDispatch();
  const data: Product = useSelector((state: ProductState) => state.data)
  const images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
  const tweet_eque_id: string = "1455546852137480196"

  useEffect(() => {
    TweetContainerInit();
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
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
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


