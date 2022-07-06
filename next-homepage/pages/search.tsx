import { NextPage } from "next";
import styles from './search.module.scss'

const Search: NextPage = (props: any) => {
  return (
    <div className={styles.searchContainer}>      
      <aside className={styles.searchContainer__sidebar}>
          ...
      </aside>

      <main className={styles.searchContainer__main}>
          ...
      </main>

    </div>
  )
}

export default Search;