import Hero from "./components/Hero/Hero.jsx";
import Gallery from "./components/Gallery/Gallery";
import FollowUs from "./components/Follow/Follow.jsx";
import About from "./components/About/About.jsx";
import LoveStory from "./components/LoveStory/LoveStory.jsx";


export default function Home() {
  return (
    <div className="transition-colors">
      <Hero />
      <Gallery />
      <LoveStory />
     
      <About />
      <FollowUs />
      

     </div>
  );
}
