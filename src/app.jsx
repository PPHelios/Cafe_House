import { useEffect } from "preact/hooks";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import { useTranslation } from "react-i18next";
import { appState } from "./store/appState";
import MainLayout from "./layouts/MainLayout";
import Menu from "./features/Menu/Menu";
import HomePage from "./features/HomePage/HomePage";

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
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
        colorScheme: appState.themeColor.color.value,
        dir: docDir === "rtl" ? "rtl" : "ltr",
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
