import { useEffect, useState } from "react";
import { Shop } from "../../types/shop";
import styles from "./kakaoMap.module.scss"
import { MapProps, MapPropsList } from "./MapProps";
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { mapData } from "../../types/mapData";


export default function KakaoMap({ latitude, longitude, markerList = [], searchShopList }: mapData<Shop>) {
    const [state, setState] = useState<kakao.maps.event.EventTarget>()

    useEffect(() => {
        // 모바일일 경우 현재 위치정보 팝업

        // 컴퓨터일 경우 현재 위치정보 입력 모달 팝업
        // const mapScript = document.createElement("script");
        // mapScript.async = true;
        // mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
        // document.head.appendChild(mapScript);

        // const onLoadKakaoMap = () => {
        //     window.kakao.maps.load(() => {
        //         const container = document.getElementById("map");
        //         const options = {
        //             center: new window.kakao.maps.LatLng(latitude, longitude),
        //         };
        //         const map = new window.kakao.maps.Map(container, options);

        //         markerList.map((value: Shop) => {                    
        //             let infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
        //             const markerPosition = new window.kakao.maps.LatLng(value.lat, value.lng);
        //             const marker = new window.kakao.maps.Marker({
        //                 position: markerPosition,
        //             });
        //             marker.setMap(map);

        //             const categories = value.categoryName.split(" > ");                    

        //             // 마커에 클릭이벤트를 등록합니다
        //             window.kakao.maps.event.addListener(marker, 'click', function() {
        //                 // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        //                 let content  = '<div style=' +
        //                 '               "font-size:14px; margin:1rem; margin-bottom:1.5rem; width:100%">' +
        //                 '                   <h1>' + value.name + '</h1>' +                         
        //                 '                   <a style="color:cadetblue" href="tel:'+ value.callNumber+ '">' + value.callNumber + '</a>' +
        //                 '                   <p>' + value.addressName + '</p>' +
        //                 '                   <a style="color:blue" href="'+ value.homepageLink+ '">홈페이지</a>' +
        //                 '</div>'
        //                 infowindow.setContent(content);
        //                 infowindow.open(map, marker);
        //             });
        //         })

        //     });
        // };
        // mapScript.addEventListener("load", onLoadKakaoMap);

        // return () => mapScript.removeEventListener("load", onLoadKakaoMap);

    }, [latitude, longitude, markerList])
    const openMarkerWindow = (data: Shop) => {
        return (
            <div className={styles.map__marker}>
                <h1>{data.name}</h1>
                <a style={{ color: "cadetblue" }} href={`tel:${data.callNumber}`}>{data.callNumber}</a>
                <p>{data.addressName}</p>
                <a style={{ color: "blue" }} href={`tel:${data.homepageLink}`}>{data.homepageLink}</a>
            </div>
        )
    }
    /**
     * 중심 좌표 변경시의 이벤트
     * @param map 
     */
    const centerChanged = (map: kakao.maps.Map) => {
        setState({
            level: map.getLevel(),
            center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
            }
        })
        searchShopList(map.getCenter().getLat(), map.getCenter().getLng())
    }

    const moveCenter = () => {
        setState({
            center: { lat: latitude, lng: longitude },
            isPanto: true,
        })
    }

    useEffect(() => {
        moveCenter();
    }, [])

    return (
        <Map id="map" style={{ width: "100%", height: "80vh" }} center={{ lat: latitude, lng: longitude }}
            onCenterChanged={centerChanged}>
            {markerList.map((data: Shop, key: any) => {
                return (
                    <MapMarker position={{ lat: data.lat, lng: data.lng }} clickable={true} onClick={() => openMarkerWindow(data)} key={key}>

                    </MapMarker>
                )
            })}
        </Map>
    );
}

