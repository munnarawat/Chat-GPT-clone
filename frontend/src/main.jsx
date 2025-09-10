import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import SmoothScrolling from "./animation/SmoothScrolling.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <SmoothScrolling>
        <App />
      </SmoothScrolling>
    </BrowserRouter>
  </Provider>
);
