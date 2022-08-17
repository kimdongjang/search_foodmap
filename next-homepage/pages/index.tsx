import axios from "axios";
import cookies from 'next-cookies'

import styles from './index.module.scss'

import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import KakaoMap from "../components/kakaoMap/KakaoMap";
import { MapProps, MapPropsList } from "../components/kakaoMap/MapProps";
import { Shop } from "../types/shop";
import { BsFillFileArrowUpFill } from 'react-icons/bs'
import FloatMarkerList from "../components/search/FloatMarkerList";


interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

Index.getInitialProps = (ctx: NextPageContext) => {
  const { token } = cookies(ctx);
  return { token }
}
// https://codesandbox.io/s/oxy3e?file=/pages/api/profile.js

const Index: NextPage = (props: any) => {
  /**
   * 모바일인지 체크
   * @returns 
   */
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  /**
   * geolocation으로 현재 위치의 lat, lng 확인
   */
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, }
  })

  const [markerList, setMarkerList] = useState<Shop[]>([]);
  /**
   * 키워드와 위치를 기준으로 음식점 검색
   */
  async function searchShopList() {
    try {
      const query = {
        keyword: queries.keyword,
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        radius: 2,
      }
      let list = await axios.get(process.env.NEXT_PUBLIC_DEVELOPMENT_DESTINATION_URL + "api/shop/search/list", { params: query })
      setMarkerList(list.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  /**
     * 현재 위치 가져오는 method
     */
  const getLocation = function (resolve: any, reject: any) {
    let gpsOptions = {
      enableHighAccuracy: true,
      timeout: 5000
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, gpsOptions);
  }



  /**
   * next.js router.query가 빈값일 때, Automatic Static Optimization(정적 파일 최적화)에 의해
   * 정적으로 최적화된 페이지는 루트 매개 변수가 제공되지 않아서 query가 빈 객체가 된다고 함.
   * 10.0.5이후 router.isReady 사용
   * 라우터 필드가 클라이언트 측에서 업데이트 되고 사용할 준비가 되었는지의 여부를 반환하며,
   * useEffect 메소드 내에서만 사용
   */
  const router = useRouter();
  const queries = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    // router 쿼리가 초기화가 되었을 경우 location 초기화
    if (!isMobile()) {

    }
    else {

    }

    getLocation((position: any) => {
      setLocation(
        {
          loaded: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }
      )
    }, () => { })
  }, [router.isReady])

  useEffect(() => {
    if (location.coordinates.lat === 0 || location.coordinates.lng === 0) return;
    searchShopList();

  }, [location])

  const [currentCenter, setCurrentCenter] = useState({});

  return (
    <div className={styles.searchContainer}>
      {location.coordinates.lat === 0 ?
        <div className={styles.geoApply}>
          <BsFillFileArrowUpFill className={styles.geoApplyIcon} />
          <p className={styles.geoApplyText}>위치 정보를 확인할 수 있게 권한을 주세요!</p>
        </div> : null}
      <div className={styles.searchContainer__map}>
        <KakaoMap latitude={location.coordinates.lat} longitude={location.coordinates.lng} markerList={markerList} />
      </div>
      <div className={styles.searchContainer__sidebar}>
        <FloatMarkerList markerList={markerList} />
      </div>



      {/* <aside className={styles.searchContainer__sidebar}>
        ...
      </aside> */}
    </div>
  )
}

export default Index;