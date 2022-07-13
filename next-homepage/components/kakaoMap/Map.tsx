import { useEffect, useState } from "react";
import styles from "./map.module.scss"
import { MapProps, MapPropsList } from "./MapProps";


export default function Map({ latitude, longitude, markerList }: any) {
    const [location, setLocation] = useState<locationType>({
        loaded: false,
        coordinates: { lat: 0, lng: 0, }
    })

    // 성공에 대한 로직
    const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    }


    // 에러에 대한 로직
    const onError = (error: { code: number; message: string; }) => {
        alert("error")
        setLocation({
            loaded: true,
            error,
        })
    }

    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    useEffect(() => {
        async function getLocation() {
            try {
                // navigator 객체 안에 geolocation이 없다면
                // 위치 정보가 없는 것.            
                if (!("geolocation" in navigator)) {
                    onError({
                        code: 0,
                        message: "Geolocation not supported",
                    })
                }
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
                alert(location.coordinates.lat + " + " + location.coordinates.lng)
            }
            catch (e) {

            }
        }
        getLocation();

        if (!isMobile()) {

        }
        else {

        }
    }, [])
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

                markerList.map((value: MapProps) => {
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


interface locationType {
    loaded: boolean;
    coordinates?: { lat: number; lng: number };
    error?: { code: number; message: string };
}
