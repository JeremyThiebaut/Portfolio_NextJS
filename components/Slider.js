import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "../styles/Slider.module.scss";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Slider = ({ slider, profil }) => {
  return (
    <div className={styles.slider}>
      <Carousel
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
              src={slide.pictureUrl}
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
      <Link className={styles.slider__down} href="/#navBar">
        <FontAwesomeIcon
          className={styles.slider__icone}
          icon={faAngleDown}
          aria-hidden="true"
        />
      </Link>
    </div>
  );
};

export default Slider;
