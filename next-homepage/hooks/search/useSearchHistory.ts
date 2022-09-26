import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../modules/store'

const useSearchHistory = () => {
  const router = useRouter()
  const [list, setList] = useState<string[]>([])

  /**
   * searchHistory List init in cookie
   */
  useEffect(() => {
    const list: string[] = JSON.parse(localStorage.getItem('searchHistory'))
    if (list === null || list.length === undefined) return
    else {
      setList(list)
    }
  }, [])

  const Search = (text: string) => {
    if (text === '') return
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
    router.push({
      pathname: '/',
      query: {
        keyword: text,
      },
    })
  }

  return {
    list,
    Search,
  }
}

export default useSearchHistory
