import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
