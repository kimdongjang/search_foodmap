import { useEffect, useState } from 'react';
import { Shop } from '../../types/shop'
import styles from './floatMarkerList.module.scss'


export default function FloatMarkerList(prop: any) {
  return (
    <div className={styles.listContainer}>
      <div>
        {prop.markerList.length && prop.markerList.length > 0
          ? prop.markerList.map((data: Shop) => {            
            return(
              <div>
                <div>{data.name}</div>
                <div>{data.callNumber}</div>
                <div>{data.addressName}</div>
              </div>
            )
          })
          : <div></div>
        }
      </div>
    </div>
  )
}