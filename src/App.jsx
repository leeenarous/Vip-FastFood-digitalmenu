import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/style.css";

import Header from "./components/Header";
import CategoryGrid from "./components/CategoryGrid";
import CategoryPage from "./components/CategoryPage";
import ItemPage from "./components/ItemPage";
import Footer from "./components/Footer";
import useMenuData from "./assets/useMenuData";
import RateUs from "./components/RateUs";

export default function App() {
  const { groupedMenu, loading, error } = useMenuData("1-fD1EKUGNs9Qu63A3zV7DOx39nhe0ZqjBLVvcwBXVwo");
  const categories = Object.keys(groupedMenu);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={
            <CategoryGrid
              categories={categories}
              groupedMenu={groupedMenu}
              loading={loading}
            />
          } />
          <Route path="/category/:categoryName" element={
            <CategoryPage
              groupedMenu={groupedMenu}
              loading={loading}
              error={error}
            />
          } />
          <Route path="/category/:categoryName/item/:itemIndex" element={
            <ItemPage groupedMenu={groupedMenu} />
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}