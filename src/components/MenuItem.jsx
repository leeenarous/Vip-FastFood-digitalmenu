import React from "react";

export default function MenuItems({
  selectedCategory,
  groupedMenu,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="menu-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="menu-card skeleton-card" key={i}></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  if (!selectedCategory) return null;

  return (
    <section className="menu-section">
      <h2 className="section-title">{selectedCategory}</h2>

      <div className="menu-grid">
        {groupedMenu[selectedCategory]?.map((item, index) => (
          <div className="menu-card" key={index}>
            <div className="menu-image-wrapper">
              {item.image_url ? (
                <img src={item.image_url} alt={item.item_name} />
              ) : (
                <div className="fallback-icon">🍽️</div>
              )}
            </div>

            <div className="price-badge">{item.price}</div>

            <div className="menu-content">
              <h3>{item.item_name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}