import { useEffect } from "preact/hooks";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
//import { mantineTheme } from "./utils/mantineTheme";
import { useTranslation } from "react-i18next";
import { themeColor } from "./store/appState";

// BACKENDLESS
// import Backendless from "backendless";
// Backendless.initApp(
//   import.meta.env.VITE_APPLICATION_ID,
//   import.meta.env.VITE_JS_API_KEY
// );
//Import Parse minified version
import Parse from "parse/dist/parse.min.js";

//Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = import.meta.env.VITE_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = import.meta.env.VITE_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = import.meta.env.VITE_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
import MainLayout from "./layouts/MainLayout";
import AdminPanel from "./features/AdminPanel/AdminPanel";
import { ProtectedRoutes } from "./features/AdminPanel/ProtectedRoutes";
import Menu from "./features/Menu/Menu";
import HomePage from "./features/HomePage/HomePage";
import MapSearch from "./features/MapSearch/MapSearch";
// import AddProperty from "./features/AddProperty/AddProperty";
import Login from "./features/Authentication/Login";
import Signup from "./features/Authentication/Signup";
import AddAgent from "./features/AdminPanel/AddAgent";
import AddAgency from "./features/AdminPanel/AddAgency";
import AddProperty from "./features/AdminPanel/AddProperty";
import { userData } from "./store/appState";
export function App() {
  const rtlCache = createEmotionCache({
    key: "mantine-rtl",
    stylisPlugins: [rtlPlugin],
  });

  const { i18n } = useTranslation();
  const docDir = i18n.dir();
  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await Parse.User.current();
      userData.value = currentUser;
      console.log(currentUser);
      return true;
    };
    getCurrentUser();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<MapSearch />} />
          <Route path="/add" element={<AddProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminpanel/addagent" element={<AddAgent />} />
          <Route path="/adminpanel/addagency" element={<AddAgency />} />
          <Route path="/adminpanel/addproperty" element={<AddProperty />} />
          {/* <Route element={<AdminPanel />}>
            <Route path="/adminpanel/addagent" element={<AddAgent />} />
          </Route> */}
        </Route>
      </>
    )
  );
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={docDir === "rtl" ? rtlCache : undefined}
      theme={{
        colorScheme: themeColor.value,
        dir: docDir === "rtl" ? "rtl" : "ltr",
        colors: {
          // Add your color
          gold: ["#c79c60" /* ... */],
          main: ["#282726"],
          // or replace default theme color
          //  blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        },
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
