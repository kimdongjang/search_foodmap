import type { NextPage } from 'next'
import { DOMAttributes, KeyboardEvent, KeyboardEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { productsActions } from '../modules/reducers/productReducer'
import axios, { AxiosResponse } from 'axios'
import styles from './search.module.scss'
import { useRouter } from 'next/router'
import { searchItem, searchItemActions } from '../modules/reducers/searchItemReducer'
import { testFetch } from '../modules/reducers/apiReducer'
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../modules/store'


import tw from "tailwind-styled-components";


const MainWrapper = tw.div`
  relative bg-blue-900 py-10 px-6 shadow-xl h-full
`

const SearchWrapper = tw.div`
  h-full relative flex justify-center items-center flex-col
`

const SearchForm = tw.form`
  relative flex justify-center items-center
`

const SearchFormWrapper = tw.div`
  relative w-full
`

const SearchInput = tw.input`
  bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 
  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500

`

const SearchButton = tw.div`
  flex items-center

  absolute ml-18 mb-5
  border-2 rounded-lg
  bg-white 
`

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
  // const data: Product = useSelector((state: any) => state.productReducer.data)
  const keyword: string = useSelector((state: any) => state.searchItemReducer.data)

  const topRef = useRef(null); // top으로 올리는 버튼
  const searchRef = useRef<HTMLInputElement>(null); // 검색 값 엘리먼트


  const [isRecent, setIsRecent] = useState<boolean>(false);

  const [visitor, setVisitor] = useState<number>(0);

  const imgHref = useSelector((state: any) => state.testReducer.imgHref);
  const dispatch = useAppDispatch();


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
   * test Reducer(api thunk redux)
   */
  useEffect(() => {
    const test = async () => {
      const apiAction = await dispatch(testFetch());
      const img = unwrapResult(apiAction);
      console.log(img)
    }
    test();

  }, []);

  /**
   * searchHistory List init in cookie
   */
  useEffect(() => {
    const list: string[] = JSON.parse(localStorage.getItem('searchHistory'));
    if (list === null || list.length === undefined) return;
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
    dispatch(searchItemActions.changeSearchItem({ data: value } as searchItem));
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
  const searchProcess = (text: string) => {
    var isOverlap = false;
    searchHistoryList.filter((value) => {
      if (value === text) {
        isOverlap = true;
      }
    })
    if (!isOverlap) {
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
    <MainWrapper ref={topRef}>
      <SearchWrapper>
        <TopButton displayAfter={0} target={topRef}>TOP</TopButton>
        <SearchForm >
          <label className="sr-only">Search</label>
          <SearchFormWrapper>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <SearchInput type="text" placeholder="Search Mockups, Logos, Design Templates..."
              laceholder="Search" onChange={onChange} onFocus={() => { setIsRecent(true) }} onBlur={() => { setIsRecent(false) }}
              onKeyDown={onKeyDown} ref={searchRef} />
            <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
              <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
            </button>
          </SearchFormWrapper>
          {isRecent ? <div className={styles.indexMain__searchForm__keywordContainer}>
            {searchHistoryList.length && searchHistoryList.length > 0
              ? searchHistoryList.map((value, idx) => (
                <div key={idx} className={styles.indexMain__searchForm__keywordInner}
                  onMouseDown={() => { searchProcess(value) }}>
                  {value}
                </div>
              )) : <div></div>}
          </div> : null}
          <button type="submit" onClick={Search} className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
          </button>
        </SearchForm>
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
      </SearchWrapper>
    </MainWrapper >

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


