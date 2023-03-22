import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import { appState } from "../store/appState";
function MainLayout() {
  const x = "shop4";
  return (
    <>
      <Navbar />
      {/* <LanguageSwitcher />
      <button onClick={() => appState.changethemeColor()}>change theme</button> */}
      <Outlet />
    </>
  );
}
export default MainLayout;
