import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

// Custom Left Arrow (No text, just an icon)
const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-pink-600 shadow-md"
    onClick={onClick}
  >
    ❮
  </div>
);

// Custom Right Arrow (No text, just an icon)
const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-pink-600 shadow-md"
    onClick={onClick}
  >
    ❯
  </div>
);

function CategorySlider() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4002/book");
        // Filters out 'Free' books so this slider only shows your premium categories
        const premiumBooks = res.data.filter(
          (data) => data.category !== "Free",
        );
        setBook(premiumBooks);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1, // Scrolls one book horizontally at a time
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-12">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl pb-2">
          📚 Explore Premium Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Scroll through our Thriller, Storytelling, Comedy, and Horror
          collections.
        </p>
      </div>

      {/* The 'relative' class is crucial here for the custom arrows to position correctly */}
      <div className="relative px-6">
        <Slider {...settings}>
          {book.map((item) => (
            <div key={item._id} className="px-3 py-2">
              <Cards item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategorySlider;
