import { useEffect, useState } from "react";
import { Shop } from "../../types/shop";
import styles from "./map.module.scss"
import { MapProps, MapPropsList } from "./MapProps";


export default function Map({ latitude, longitude, markerList=[] }: any) {
    useEffect(() => {
        // 모바일일 경우 현재 위치정보 팝업

        // 컴퓨터일 경우 현재 위치정보 입력 모달 팝업


        const mapScript = document.createElement("script");
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                };
                const map = new window.kakao.maps.Map(container, options);

                markerList.map((value: Shop) => {
                    console.log(value)
                    const markerPosition = new window.kakao.maps.LatLng(value.lat, value.lng);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });
                    marker.setMap(map);
                })
                
            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);

    }, [latitude, longitude, markerList])
    return (
        <div id="map" className={styles.map} />
    );
}

