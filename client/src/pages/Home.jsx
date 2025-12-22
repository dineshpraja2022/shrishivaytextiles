import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import Category from "../components/Category";
import BrandBondingSection from "../components/BrandBondingSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Sachin from "../components/Sachin";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  return (
    <div className="mt-0 ">
      <Banner />
           <FeaturedProducts/>
      <Sachin/>
       <WhyChooseUs />

      <Category />
      <BestSeller />
    {/* <Carousel/> */}
    <BrandBondingSection/>
    </div>
  );
};
export default Home;
