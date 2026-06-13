import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemPage({ groupedMenu }) {
  const { categoryName, itemIndex } = useParams();
  const navigate = useNavigate();
  const category = decodeURIComponent(categoryName);
  const item = groupedMenu[category]?.[parseInt(itemIndex)];

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!item) return <div className="error-box">الصنف غير موجود</div>;

  return (
    <div className="item-page">
      <button className="back-btn" onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}>
        ← رجوع
      </button>

      <div className="item-hero">
        <div className="item-hero-image">
          {item.image_url ? (
            <img src={item.image_url} alt={item.item_name} />
          ) : (
            <div className="item-fallback">🍽️</div>
          )}
        </div>
        <h1 className="item-hero-name">{item.item_name}</h1>
      </div>

      <div className={`item-details ${showDetails ? "visible" : ""}`}>
        <div className="item-price-big">{item.price} ل.س</div>
        <div className="item-description-box">
          <h3>المكونات</h3>
          <div className="ingredients-list">
            {item.description.split("-").map((ing, i) => (
              <span
                key={i}
                className="ingredient-tag"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {ing.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
