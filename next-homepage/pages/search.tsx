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
import useSearchHistory from '../hooks/search/useSearchHistory'
import FloatSearch from '../components/search/FloatSearch'


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

const SearchIcon = tw.div`
  flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none
`
const SearchAudioIcon = tw.button`
  flex absolute inset-y-0 right-0 items-center pr-3
`
const SearchButton = tw.button`
inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium
 text-white bg-blue-700 border border-blue-700
 hover:bg-blue-800 focus:ring-4
 focus:outline-none focus:ring-blue-300
  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
`

const KeywordContainer = tw.div`
  z-[3] rounded-lg w-[300px] h-[50vh] bg-white absolute p-8
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
  // console.log(
  //   "d", process.env.DESTINATION_URL,
  //   "pd", process.env.NEXT_PUBLIC_DESTINATION_URL,
  //   "dd", process.env.DEVELOPMENT_DESTINATION_URL,
  //   "npdd", process.env.NEXT_PUBLIC_DEVELOPMENT_DESTINATION_URL,
  //   "pd", process.env.PRODUCTION_DESTINATION_URL,
  //   "nppd", process.env.NEXT_PUBLIC_PRODUCTION_DESTINATION_URL);
  // const data: Product = useSelector((state: any) => state.productReducer.data)
  const keyword: string = useSelector((state: any) => state.searchItemReducer.data)

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


  return (
    <MainWrapper>
      <SearchWrapper>
        {/* <TopButton displayAfter={0} target={topRef}>TOP</TopButton> */}
        <FloatSearch />
        <div className="flex justify-center items-center">
          <ul className="flex flex-column">
            {recommandList.map((data, i) => {
              return (
                <div className="inline-flex flex-column" key={i}>
                  <li className="p-2">{data.name}</li>
                  <div className="bg-gray-200 w-2 h-2"></div>
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


