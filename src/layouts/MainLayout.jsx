import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
function MainLayout() {
  const x = "shop4";
  return (
    <>
      <Navbar />
      {/* <LanguageSwitcher />
      <button onClick={() => appState.changethemeColor()}>change theme</button> 
      new URL('./img.png', import.meta.url).href
      */}
      <Outlet />
      <Footer />
    </>
  );
}
export default MainLayout;
