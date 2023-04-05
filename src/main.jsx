import { render } from "preact";
import { Suspense } from "preact/compat";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { App } from "./app";
import "./i18n";
render(
  <Suspense fallback={<LoadingPage />}>
    <App />
  </Suspense>,
  document.getElementById("app")
);
