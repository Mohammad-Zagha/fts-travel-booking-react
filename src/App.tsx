import { BlurIn } from "./components/animation/blur_in";
import Hero from "./components/pages/Home/Hero";
import { SmoothScrollHero } from "./components/pages/Home/SmoothScrollHero";
import Layout from "./components/Layout";
import { useAuth } from "./context/authContext";
import FeaturedDeals from "./components/pages/Home/authed/FeaturedDeals";
import RecentlyVisted from "./components/pages/Home/authed/RecentlyVisted";
import TrendingDestinations from "./components/pages/Home/authed/TrendingDestinations";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Hero />
      {!isAuthenticated && (
        <>
          <div className=" px-6 md:px-32 flex flex-col gap-20 md:gap-32  ">
            <div className="  flex items-center gap-12">
              <div className=" space-y-6 text-center md:text-left">
                <span className="text-primary text-sm font-semibold tracking-wide">
                  TIMELESS HISTORY
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
                  <div>Discover</div>
                  <div>Egypt</div>
                  <div>with Us</div>
                </div>
                <p className="text-primary text-sm sm:text-base font-medium">
                  Journey across continents, cultures, and landscapes.
                  <br />
                  Because every path leads to new discoveries.
                </p>
              </div>

              <div className=" w-full h-[300px]  sm:h-[400px]">
                <img
                  src="./assets/desert.jpg"
                  alt="Desert landscape"
                  className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>

            <BlurIn className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary w-2/3 mx-auto">
              Explore the Pyramids, cruise the Nile, and uncover ancient wonders
              with our expertly curated travel experiences. Book your
              <span className="text-muted"> dream trip today!</span>
            </BlurIn>

            <div className=" mx-auto w-full p-8 px-12 bg-[rgb(255,232,210)] rounded-2xl flex gap-6 md:gap-12 justify-center">
              <div className="w-full h-[300px]  sm:h-[350px]">
                <img
                  src="./assets/pyramids.png"
                  alt="Desert landscape"
                  className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className=" space-y-1 text-center md:text-left">
                <span className="text-primary text-sm font-semibold tracking-wide">
                  TIMELESS HISTORY
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
                  <div>Why</div>
                  <div>Travel</div>
                  <div>with Us</div>
                </div>
                <p className="text-primary text-xs sm:text-base font-medium">
                  Journey across continents, cultures, and landscapes.
                  <br />
                  Because every path leads to new discoveries.
                </p>
              </div>
            </div>
          </div>
          <SmoothScrollHero />
        </>
      )}
      {isAuthenticated && (
        <>
          <div className="p-8">
            <FeaturedDeals />
            <RecentlyVisted />
          </div>
          <TrendingDestinations />
        </>
      )}
    </Layout>
  );
}

export default App;
