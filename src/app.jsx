import { useEffect } from "preact/hooks";
//import { lazy } from "preact/compat";
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
import {
  themeColor,
  queryAgentsInAgency,
  agents,
  userData,
  properties,
  queryAllProperties,
  getUserFavorites,
} from "./store/appState";
import { Notifications } from "@mantine/notifications";
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
const AdminPanel = lazy(() => import("./layouts/AdminPanel"));
//import { ProtectedRoutes } from "./features/AdminPanel/ProtectedRoutes";
//import Menu from "./features/Menu/Menu";
import HomePage from "./features/HomePage/HomePage";
const MapSearch = lazy(() => import("./features/MapSearch/MapSearch"));

// import AddProperty from "./features/AddProperty/AddProperty";
const Login = lazy(() => import("./features/Authentication/Login"));

const Signup = lazy(() => import("./features/Authentication/Signup"));
// import AddAgent from "./features/AdminPanel/AddAgent";
// import AddAgency from "./features/AdminPanel/AddAgency";
//import AddProperty from "./features/AdminPanel/AddProperty";

const AddProperty = lazy(() => import("./features/AdminPanel/AddProperty"));


const SignupAgency = lazy(() => import("./features/Authentication/SignupAgency"));

const SignupAgent = lazy(() => import("./features/Authentication/SignupAgent"));

const NotFound404 = lazy(() => import("./features/NotFound404/NotFound404"));

const ListWithUs = lazy(() => import("./features/ListWithUs/ListWithUs"));
//import AdminHome from "./features/AdminPanel/Agents";
//import AdminPanelAnalytics from "./components/AdminPanelStats/AdminPanelAnalytics";
//import ListedProperties from "./features/AdminPanel/ListedProperties";
// import Account from "./features/AdminPanel/Account";
// import Security from "./features/AdminPanel/Security";
// import Settings from "./features/AdminPanel/Settings";
// import Agents from "./features/AdminPanel/Agents";
const AdminHome = lazy(() => import("./components/AdminPanel/Agents"));
const AdminPanelAnalytics = lazy(() => import("./components/AdminPanelStats/AdminPanelAnalytics"));
const ListedProperties = lazy(() => import("./components/AdminPanel/ListedProperties"));
const Account = lazy(() => import("./components/AdminPanel/Account"));
const Security = lazy(() => import("./components/AdminPanel/Security"));
const Settings = lazy(() => import("./components/AdminPanel/Settings"));
const Agents = lazy(() => import("./components/AdminPanel/Agents"));


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
    const initialData = async () => {
      try {
        const currentUser = await Parse.User.current();
        userData.value = currentUser;
        console.log(currentUser);
        // const searchOptionsQuery = new Parse.Query("searchOptions");
        // searchOptionsQuery.contains("name", "englishOptions");
        // let queryResult = await searchOptionsQuery.first();
        // console.log(queryResult.get("options"));

        // searchOptions.value = queryResult.get("options");

        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
      }
    };
    initialData();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/search"
            element={<MapSearch />}
            loader={ async() => {
             const favorites= await getUserFavorites();
             return true
            }}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Listwithus" element={<ListWithUs />} />
          <Route path="/signupagency" element={<SignupAgency />} />
          <Route path="/signupagent" element={<SignupAgent />} />
          {/* <Route path="/adminpanel/addagent" element={<AddAgent />} />
          <Route path="/adminpanel/addagency" element={<AddAgency />} /> */}

          <Route
            element={<AdminPanel />}
            loader={async () => {
              const agentsQuery = await queryAgentsInAgency();
              console.log(agentsQuery);
              agents.value = agentsQuery;
              const propertiesQuery = await queryAllProperties();
              console.log(propertiesQuery);
              properties.value = propertiesQuery;

              return true;
            }}
          >
            <Route path="/adminpanel" element={<AdminHome />} />
            <Route path="/adminpanel/addproperty" element={<AddProperty />} />
            <Route
              path="/adminpanel/listedproperties"
              element={<ListedProperties />}
            />
            <Route
              path="/adminpanel/agentanalytics"
              element={<AdminPanelAnalytics />}
            />
            <Route path="/adminpanel/agents" element={<Agents />} />
            <Route path="/adminpanel/account" element={<Account />} />
            <Route path="/adminpanel/security" element={<Security />} />
            <Route path="/adminpanel/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound404 />} />
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
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
