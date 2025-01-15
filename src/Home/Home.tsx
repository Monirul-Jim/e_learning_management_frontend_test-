import AboutSection from "./AboutSection/AboutSection";
import CourseSection from "./CourseSection/CourseSection";
import FAQSection from "./FAQSection/FAQSection";
import HeroSection from "./HeroSection/HeroSection";
import HiredStudent from "./HiredStudent/HiredStudent";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-white to-blue-100 ">
      <HeroSection />
      <CourseSection />
      <HiredStudent />
      <WhyChooseUs />
      <FAQSection />
      <AboutSection />
    </div>
  );
};

export default Home;
