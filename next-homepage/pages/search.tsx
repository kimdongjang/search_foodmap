import { NextPage } from "next";
import Map from "../components/kakaoMap/Map";
import styles from './search.module.scss'

const Search: NextPage = (props: any) => {
  return (
    <div className={styles.searchContainer}>
      <main className={styles.searchContainer__main}>
        <Map latitude={36.42304616289929} longitude={127.3961088918402} />
      </main>

      <aside className={styles.searchContainer__sidebar}>
        ...
      </aside>
    </div>
  )
}

export default Search;