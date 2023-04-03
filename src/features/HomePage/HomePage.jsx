import { Hero } from "./Hero";

import MapSearch from "../MapSearch/MapSearch";
import FaqWithHeader from "./FaqWithHeader";
import StatsGroup from "./StatsGroup";
function HomePage() {
  return (
    <>
      <Hero />
      <StatsGroup />
      <FaqWithHeader />
    </>
  );
}
export default HomePage;
