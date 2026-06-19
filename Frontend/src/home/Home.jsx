import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import CategorySlider from "../components/CategorySlider";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <CategorySlider />
      <Footer />
    </>
  );
}

export default Home;
