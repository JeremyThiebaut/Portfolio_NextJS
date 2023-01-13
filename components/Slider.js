import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "../styles/slider.module.scss";

const Slider = ({ slider }) => {
  console.log(slider);
  return (
    <div className={styles.slider}>
      <Carousel
        id="carousel"
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
      <div className="slider-zone">
        <h1 className="slider-zone-top animate__animated animate__fadeInUp">
          Jérémy THIEBAUT
        </h1>
        <hr className="slider-zone-middle animate__animated animate__fadeInLeft" />
        <h2 className="slider-zone-bottom animate__animated animate__fadeInDown">
          Développeur Web
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
