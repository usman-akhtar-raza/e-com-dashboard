import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { configureStore } from "@reduxjs/toolkit";
import globalRdeucer from "./state/index.ts";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import {api} from "./state/api.ts"
const store = configureStore({
  reducer: {
    global: globalRdeucer,
    [api.reducerPath]:api.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware),
});
setupListeners(store.dispatch)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
