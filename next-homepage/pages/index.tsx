import type { NextPage } from 'next'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../interfaces/Product'
import { productsActions, ProductState } from '../modules/reducers/productReducer'
import axios, { AxiosResponse } from 'axios'
import { testFetch } from '../modules/reducers/apiReducer'
import { AiOutlineSearch } from "react-icons/ai"
import styles from './index.module.css'

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

  const recommandList = [{
    name: "test1",
    type: "test"
  },
  {
    name: "test2",
    type: "test"
  },
  {
    name: "test3",
    type: "test"
  },
  {
    name: "test4",
    type: "test"
  }]

  useEffect(() => {
    async function get() {
      try {
        const result = await axios.post("/redis/visit");
        console.log(result.data)
        if (result) setVisitor(result.data)
      }
      catch (e) {

      }
    }
    // get();

    async function test() {
      try {
        const result = await dispatch(testFetch())
        console.log(result)
      }
      catch (e) {

      }
    }
    test();
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
  {/* <div className={styles.twitterContainer}>
    <div className="twitter-timeline" data-height="50%"></div>
  </div> */}

  return (
    <div ref={topRef} className={styles.indexMain}>
      <TopButton displayAfter={0} target={topRef}>TOP</TopButton>
      <div>
        <form method="get" action="#" className="relative z-50">
          <button type="submit" id="searchsubmit" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <input type="text" name="s" id="s" className="w-full pl-10 pr-3 py-2 border border-transparent 
            rounded-md leading-5 bg-red-600 text-gray-300 placeholder-gray-400
            focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out" placeholder="Search">
          </input>
        </form>
        <div>
          <ul className="flex flex-column">
            {recommandList.map((data, i) => {
              return(
                <div className="inline p-4 flex flex-column" key={i}>
                  <li className="p-4">{data.name}</li>
                  <div className='bg-gray-300 w-1 h-4 p-4'></div>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
      {/* <div >   
          <button onClick={pushEvent}>Push Button</button>
          <img src={data?.message} alt="test" width={500} height={500}></img>
          <div>{data?.message}</div>
      </div > */}
      <div className='py-32 text-center'>
        {/* font-size:2.25rem, line-height: 2.5rem, extra-large */}
        {/* <div className='text-4xl font-extrabold'>
          방문자 : {visitor}
        </div> */}
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
    return <button className="fixed bottom-10 right-5 w-10 h-10 bg-green-300 ring-2" onClick={() => scrollToRef(target)}>TOP</button>;
  }
  return <div />;
}


export default Index;


