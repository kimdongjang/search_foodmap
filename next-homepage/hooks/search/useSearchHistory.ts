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
      dispatch(searchItemActions.changeSearchItem({ data: text } as searchItem))
      localStorage.setItem('searchHistory', JSON.stringify(list))
    }
    alert(router.pathname)
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
