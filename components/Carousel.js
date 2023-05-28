import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
}

export default function CarouselComponent({ categories }) {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const carouselRef = useRef();

  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const carouselNode = carouselRef.current;
    if (carouselNode) {
      carouselNode.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (carouselNode) {
        carouselNode.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  return (
    <div ref={carouselRef}>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={isAutoplay}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 1s ease-in"
        transitionDuration={1000}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        focusOnSelect={true}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {categories.map((category) => (
          <div key={category._id}>
            <img 
              src={category.imageUrl} 
              alt={category.name}
              className="object-contain w-full h-auto" 
            />
            <p className="legend">{category.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}