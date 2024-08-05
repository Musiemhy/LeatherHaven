import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
