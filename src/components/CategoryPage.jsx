import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryPage({ groupedMenu, loading, error }) {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const category = decodeURIComponent(categoryName);
  const items = groupedMenu[category] || [];

  if (loading) {
    return (
      <div className="menu-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="menu-card skeleton-card" key={i}></div>
        ))}
      </div>
    );
  }

  if (error) return <div className="error-box">{error}</div>;

  return (
    <section className="menu-section">
      <button className="back-btn" onClick={() => navigate("/")}>← رجوع</button>
      <h2 className="section-title">{category}</h2>
      <div className="menu-grid">
        {items.map((item, index) => (
          <div
            className="menu-card"
            key={index}
            onClick={() => navigate(`/category/${encodeURIComponent(category)}/item/${index}`)}
          >
            <div className="menu-image-wrapper">
              {item.image_url ? (
                <img src={item.image_url} alt={item.item_name} />
              ) : (
                <div className="fallback-icon">🍽️</div>
              )}
            </div>
            <h3 className="menu-card-name">{item.item_name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}