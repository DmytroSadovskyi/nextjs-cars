"use client";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "../../../../icons/down-arrow-left.svg";
import ArrowRight from "../../../../icons/down-arrow-right.svg";
import { CustomerReview } from "../../../../types/customerReview";
import Review from "../Review";
import styles from "./ReviewsSlider.module.css";

interface SliderProps {
  reviews: CustomerReview[];
}

export default function ReviewsSlider({ reviews }: SliderProps) {
  const sliderRef = useRef<Slider | null>(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          swipeToSlide: true,
        },
      },
    ],
  };

  const CustomNextArrow = (props: any) => (
    <button
      type="button"
      className={styles.btnNext}
      {...props}
      onClick={nextSlide}
    >
      <ArrowRight className={styles.iconRight} />
    </button>
  );

  const CustomPrevArrow = (props: any) => (
    <button
      type="button"
      className={styles.btnPrev}
      {...props}
      onClick={prevSlide}
    >
      <ArrowLeft className={styles.iconLeft} />
    </button>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <CustomPrevArrow />
        <CustomNextArrow />
      </div>
      <Slider {...settings} ref={sliderRef} className="slick-slider">
        {reviews.map(({ id, name, avatar, review }) => (
          <Review key={id} avatar={avatar} name={name} review={review} />
        ))}
      </Slider>
    </div>
  );
}
