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
              <div className={styles.markerList__header}>
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