import { NextPage } from "next";
import Map from "../components/kakaoMap/Map";
import { MapProps, MapPropsList } from "../components/kakaoMap/MapProps";
import styles from './search.module.scss'

const Search: NextPage = (props: any) => {
  const markerList: MapProps[] = [
    {
      latitude: 36.419570586733975,
      longitude: 127.39794217707076,
    },
    {
      latitude: 36.41979209151237,
      longitude: 127.396371121406,
    }
  ]
  return (
    <div className={styles.searchContainer}>
      <main className={styles.searchContainer__main}>
        <Map latitude={36.42304616289929} longitude={127.3961088918402} markerList={markerList} />
      </main>

      <aside className={styles.searchContainer__sidebar}>
        ...
      </aside>
    </div>
  )
}

export default Search;