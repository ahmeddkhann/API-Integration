import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import GetAxios from "./get"; 
import UserDetails from "./UserDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GetAxios />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);