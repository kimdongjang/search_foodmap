

import { useRef, useState, KeyboardEvent } from "react";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import useSearchHistory from "../../hooks/search/useSearchHistory";
import { searchItem, searchItemActions } from "../../modules/reducers/searchItemReducer";
import { useAppDispatch } from "../../modules/store";

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

const FloatSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null); // 검색 값 엘리먼트


  const keyword: string = useSelector((state: any) => state.searchItemReducer.data)
  const dispatch = useAppDispatch();
  const [isRecent, setIsRecent] = useState<boolean>(false);
  const [searchInputData, setSearchInputData] = useState<string>("");


  const searchHistroy = useSearchHistory();


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(searchItemActions.changeSearchItem({ data: value } as searchItem));
  }
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      searchHistroy.Search(searchInputData)
    }
  }

  return (
    <div>
      <SearchForm >
        <label className="sr-only">Search</label>
        <SearchFormWrapper>
          <SearchIcon>
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </SearchIcon>
          <SearchInput type="text" placeholder="Search Mockups, Logos, Design Templates..."
            laceholder="Search" onChange={onChange} onFocus={() => { setIsRecent(true) }} onBlur={() => { setIsRecent(false) }}
            onKeyDown={onKeyDown} ref={searchRef} value={searchInputData} />
          <SearchAudioIcon type="button">
            <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
          </SearchAudioIcon>
        </SearchFormWrapper>
        {isRecent ? <KeywordContainer>
          {searchHistroy.list.length && searchHistroy.list.length > 0
            ? searchHistroy.list.map((historyData, idx) => (
              <div key={idx}
                onMouseDown={() => { searchHistroy.Search(historyData) }}>
                {historyData}
              </div>
            )) : <div></div>}
        </KeywordContainer> : null}
        <SearchButton type="submit" onClick={searchHistroy.Search(searchInputData)}>
          <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
        </SearchButton>
      </SearchForm>
    </div>
  )
}
export default FloatSearch;