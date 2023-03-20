import { render } from "preact";
import { Suspense } from "preact/compat";
import { App } from "./app";
import "./i18n";
render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  document.getElementById("app")
);
