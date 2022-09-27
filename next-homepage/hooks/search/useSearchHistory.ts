import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  searchItem,
  searchItemActions,
} from '../../modules/reducers/searchItemReducer'
import { useAppDispatch } from '../../modules/store'

const useSearchHistory = () => {
  const router = useRouter()
  const [list, setList] = useState<string[]>([])
  const dispatch = useAppDispatch()

  /**
   * searchHistory List init in cookie
   */
  useEffect(() => {
    try {
      const list: any[] = JSON.parse(localStorage.getItem('searchHistory'))
      console.log(list)
      if (list === null || list.length === undefined) return
      else {
        setList(list)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  /**
   * 검색 기능
   * @param text
   * @returns
   */
  const Search = (text: string) => {
    if (text === '' || text === undefined) return
    var isOverlap = false
    list.filter((value) => {
      if (value === text) {
        isOverlap = true
      }
    })
    if (!isOverlap) {
      list.push(text)
      localStorage.setItem('searchHistory', JSON.stringify(list))
    }
    console.log('do search')
    // 현재 선택중인 아이템 변경
    dispatch(searchItemActions.changeSearchItem({ data: text } as searchItem))
    /**
     * home 화면이면 redirect 하지 않고 센터만 이동
     */
    if (router.pathname === '/') {
    } else {
      router.push({
        pathname: '/',
        query: {
          keyword: text,
        },
      })
    }
  }

  return {
    list,
    Search,
  }
}

export default useSearchHistory
