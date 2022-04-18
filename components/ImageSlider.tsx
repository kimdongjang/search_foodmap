import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from '../styles/imageSlider.module.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
    data: string[];
}

const ImageSlider: FC<Props> = ({ data }) => {
    console.log(data);
    const ref = useRef<HTMLDivElement>(null);

    const [imageList, setImageList] = useState([data[data?.length - 1], ...data, data[0],]);
    const [currentImgIndex, setCurrentImgIndex] = useState(1);

    const [touch, setTouch] = useState({
        start: 0,
        end: 0,
    });

    const [style, setStyle] = useState({
        transform: `translateX(-${currentImgIndex}00%)`,
        transition: `all 0.4s ease-in-out`,
    });


    const nextImage = () => {
        setCurrentImgIndex(currentImgIndex + 1);
        setStyle({
            transform: `translateX(-${currentImgIndex+1}00%)`,
            transition: `all 0.4s ease-in-out`,
        })
    }
    const prevImage = () => {
        setCurrentImgIndex(currentImgIndex - 1);
        setStyle({
            transform: `translateX(-${currentImgIndex-1}00%)`,
            transition: `all 0.4s ease-in-out`,
        })

    }
    useEffect(() => {
        // if (currentImgIndex === 0) {
        //     setCurrentImgIndex(imageList.length - 2);
        //     setTimeout(function () {
        //         setStyle({
        //             transform: `translateX(-${imageList.length - 2}00%)`,
        //             transition: '0ms',
        //         });
        //     }, 2000);
        // }

    }, [])

    return (
        <div className={styles.imageSlideWrap}>
            <div className={styles.imageSliderContainer}>
                {imageList?.map((image, i) => {
                    return (
                        <img key={i} src={"/images/" + image} className={styles.imageContent} style={style} />
                    )
                })}


            </div>
            <div className="absolute w-full flex justify-between top-[50%]">
                <button className="text-white text-xl" onClick={prevImage}>
                    <IoIosArrowBack />
                </button>
                <button className="text-white text-xl" onClick={nextImage}>
                    <IoIosArrowForward />
            </button>
        </div>

        </div>
    )
}

export default ImageSlider;