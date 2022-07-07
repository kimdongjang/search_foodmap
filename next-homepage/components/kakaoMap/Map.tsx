import { useEffect } from "react";
import styles from "./map.module.scss"
import { MapProps, MapPropsList } from "./MapProps";


export default function Map({ latitude, longitude }: MapProps, markerList:MapPropsList) {
    useEffect(() => {
        alert(markerList[0])
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

                markerList.map((value:MapProps) => {
                    const markerPosition = new window.kakao.maps.LatLng(value.latitude, value.longitude);
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