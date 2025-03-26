import { useMemo } from "react";
// import "./App.css";
import "./index.css";
import { useSelector } from "react-redux";
// import { ThemeProvider } from "@nivo/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/dashboard/dashboard";
import Layout from "./screens/layout";
import Products from "./screens/products"
import CustomerPage from "./screens/customerPage/index";
import Transaction from "./screens/transaction";
import Geography from "./screens/geography/index.tsx";
import Overview from "./screens/overview/index.tsx";






function App() {
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );

  // const appClasses = useMemo(() => ({
  const appClasses = useMemo(
    () => ({
      main: `min-h-screen ${
        mode === "dark"
          ? "dark bg-primary-700 text-white"
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
            <Route path="/Products" element={<Products />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
          </Route>
        </Routes>
        {/* </ThemeProvider> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
