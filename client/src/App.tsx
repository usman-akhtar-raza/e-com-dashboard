import { useMemo } from "react";
// import "./App.css";
import "./index.css";
import { useSelector } from "react-redux";
// import { ThemeProvider } from "@nivo/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/dashboard/dashboard";
import Layout from "./screens/layout";

function App() {
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );

  // const appClasses = useMemo(() => ({
  const appClasses = useMemo(
    () => ({
      main: `min-h-screen ${
        mode === "dark"
          ? "dark bg-primary-600 text-white"
          : "bg-secondary-300 text-black"
      }`,
    }),
    [mode]
  );

  return (
    <BrowserRouter>
      <div className={appClasses.main}>
        {/* <ThemeProvider theme={appClasses}> */}

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        {/* </ThemeProvider> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
