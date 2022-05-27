import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Application Structure
//APP
  //dashboard
  //data analyser
    //graph view
    //tables view
  //Sales Forecast
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* For all routes, APP component will be rendered. */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
