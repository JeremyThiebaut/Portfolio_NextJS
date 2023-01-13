import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "../styles/Slider.module.scss";
import "animate.css";

const Slider = ({ slider, profil }) => {
  console.log(profil);
  return (
    <div className={styles.slider}>
      <Carousel
        // id="carousel"
        interval={5000}
        transitionTime={1000}
        swipeable={true}
        infiniteLoop={true}
        thumbWidth={120}
        showIndicators={false}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        animationHandler={"fade"}
        autoPlay={true}
        autoFocus={true}
      >
        {slider.map((slide) => (
          <div key={slide.id}>
            <Image
              className={styles.slider__picture}
              src={slide.picture[0].url}
              alt={slide.description}
              width={500}
              height={500}
              priority
            />
          </div>
        ))}
      </Carousel>
      <div className={styles.slider__container}>
        <h1
          className={
            styles.slider__top +
            " slider-zone-top animate__animated animate__fadeInUp"
          }
        >
          {profil.firstName} {profil.lastName}
        </h1>
        <hr
          className={
            styles.slider__middle + " animate__animated animate__fadeInLeft"
          }
        />
        <h2
          className={
            styles.slider__bottom + " animate__animated animate__fadeInDown"
          }
        >
          {profil.profession}
        </h2>
      </div>
      <div className="slider-button_down">
        <Link href="/#navBar">
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
};

export default Slider;
