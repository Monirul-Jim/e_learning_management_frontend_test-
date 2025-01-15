import AboutSection from "./AboutSection/AboutSection";
import CourseSection from "./CourseSection/CourseSection";
import HeroSection from "./HeroSection/HeroSection";
import HiredStudent from "./HiredStudent/HiredStudent";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-white to-blue-100 ">
      <HeroSection />
      <CourseSection />
      <HiredStudent />
      <AboutSection />
    </div>
  );
};

export default Home;
