import { MouseEventHandler, useEffect, useState } from 'react';
import { Shop } from '../../types/shop'
import styles from './floatMarkerList.module.scss'


export default function FloatMarkerList(prop: any) {
  
  function panToMap(data: Shop) {
    // 이동할 위도 경도 위치를 생성합니다 
    // var moveLatLon = new window.kakao.maps.LatLng(data.lat,data.lng);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    // map.panTo(moveLatLon);
  }        
  return (
    <div className={styles.listContainer}>
      <div>
        {prop.markerList.length && prop.markerList.length > 0
          ? prop.markerList.map((data: Shop, index:any) => {            
            return(
              <div className={styles.markerList__header} onClick={() => panToMap(data)}>
                <div className={styles.markerList__name}>{data.name}</div>
                <div className={styles.markerList__callNumber}>{data.callNumber}</div>
                <div className={styles.markerList__address}>{data.addressName}</div>
              </div>
            )
          })
          : <div></div>
        }
      </div>
    </div>
  )
}