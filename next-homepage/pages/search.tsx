import type { NextPage } from 'next'
import { DOMAttributes, KeyboardEvent, KeyboardEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../interfaces/Product'
import { productsActions } from '../modules/reducers/productReducer'
import axios, { AxiosResponse } from 'axios'
import { testFetch } from '../modules/reducers/apiReducer'
import styles from './search.module.scss'
import { useRouter } from 'next/router'
import { clearTimeout } from 'timers'
import { searchItem, searchItemActions } from '../modules/reducers/searchItemReducer'

export async function getServerSideProps(context: any) {
  const url: string = "/images/image1.jpg"
  console.log(process.env.SERVER_DOMAIN)


  // const cookie = context.req ? context.req.headers.cookie : "";

  // const state = context.store.getState(); // state 불러오기
  const cookie = context.isServer ? context.req.headers.cookie : '';
  // SSR 환경일 때만 서버사이드에서 쿠키를 넣어주고, 클라이언트 환경일 때는 넣지 않음
  // 클라이언트 환경 - ctx.req.headers.cookie = undefined
  if (context.isServer && cookie) {
    // 서버 환경일 때만 쿠키를 심어줌. 클라이언트 환경일 때는 브라우저가 자동으로 쿠키를 넣어줌

  }


  return {
    props: {
      url: url
    },
  }
}



const Search: NextPage = (props: any) => {
  console.log(
    "d", process.env.DESTINATION_URL,
    "pd", process.env.NEXT_PUBLIC_DESTINATION_URL,
    "dd", process.env.DEVELOPMENT_DESTINATION_URL,
    "npdd", process.env.NEXT_PUBLIC_DEVELOPMENT_DESTINATION_URL,
    "pd", process.env.PRODUCTION_DESTINATION_URL,
    "nppd", process.env.NEXT_PUBLIC_PRODUCTION_DESTINATION_URL);
  const dispatch = useDispatch();
  // const data: Product = useSelector((state: any) => state.productReducer.data)
  const keyword:string = useSelector((state: any) => state.searchItemReducer.data)

  const images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
  const tweet_eque_id: string = "1455546852137480196"

  const topRef = useRef(null); // top으로 올리는 버튼
  const searchRef = useRef<HTMLInputElement>(null); // 검색 값 엘리먼트

  
  const [isRecent, setIsRecent] = useState<boolean>(false);
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
  const [searchHistoryList, setSearchHistoryList] = useState<string[]>([]);

  /**
   * searchHistory List init in cookie
   */
  useEffect(() => {
    const list:string[] = JSON.parse(localStorage.getItem('searchHistory'));    
    if(list=== null || list.length === undefined) return;    
    else {     
      setSearchHistoryList(list)
    }    
  }, []);

  /**
   * redis init
   */
  useEffect(() => {
    async function get() {
      try {
        const result = await axios.post("/redis/visit");

        if (result) setVisitor(result.data)
      }
      catch (e) {

      }
    }
    // get();
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

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     if(keyWord) updateData(keyWord);
  //   },200);
  //   return () => {
  //     clearTimeout(debounce)
  //   }
  // },[keyWord])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;    
    dispatch(searchItemActions.changeSearchItem({data:value} as searchItem));
    updateData(value)
  }

  const updateData = async (value: string) => {

  }


  const router = useRouter();
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      Search();
    }
  }
  /**
   * search 화면으로 이동
   */
  const Search = () => {
    // const input = searchRef.current.value;
    searchProcess(keyword);
  }
  const searchProcess = (text:string) =>{   
    var isOverlap = false;
    searchHistoryList.filter((value) => {
      if(value === text)
      {
        isOverlap = true;
      }
    })        
    if(!isOverlap) 
    {
      searchHistoryList.push(text);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
    }
    router.push({
      pathname: "/",
      query: {
        keyword: text
      }
    });
  }

  return (
    <div ref={topRef} className={styles.indexMain}>
      <div className={styles.indexMain__search}>
        <TopButton displayAfter={0} target={topRef}>TOP</TopButton>
        <form className={styles.indexMain__searchForm}>
          <div className={styles.indexMain__searchForm__button}>
            <button type="submit" id="searchsubmit" >
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <input type="text" name="s" id="s" className={styles.indexMain__searchForm__input}
            placeholder="Search" onChange={onChange} onFocus={()=>{setIsRecent(true)}} onBlur={()=>{setIsRecent(false)}}
            onKeyDown={onKeyDown} ref={searchRef}>
          </input>
          {isRecent ? <div className={styles.indexMain__searchForm__keywordContainer}>
            {searchHistoryList.length && searchHistoryList.length > 0
              ? searchHistoryList.map((value, idx) => (
                <div key={idx} className={styles.indexMain__searchForm__keywordInner}
                  onMouseDown={()=>{ searchProcess(value)}}>
                  {value}
                </div>
              )) : <div></div>}
          </div> : null}
        </form>
        <div className={styles.indexMain__searchButton}>
          <button onClick={Search}>검색</button>
        </div>
        <div className={styles.indexMain__searchTag}>
          <ul className="flex flex-column">
            {recommandList.map((data, i) => {
              return (
                <div className="inline flex flex-column" key={i}>
                  <li className={styles.indexMain__searchTag__text}>{data.name}</li>
                  <div className={styles.indexMain__searchTag__line}></div>
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


export default Search;


