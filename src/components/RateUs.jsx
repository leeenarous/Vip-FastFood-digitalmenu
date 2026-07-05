import React from "react";

export default function RateUs() {
  const baseUrl = import.meta.env.VITE_SOME_URL;

  const openFacebookReview = () => {
    window.open(baseUrl, "_blank", "noopener,noreferrer");
  };

  const handleClick = (e) => {
    e.preventDefault();
    openFacebookReview();
  };

  return (
    <div className="rate-us-wrap">
      <div className="rate-card">
        <div className="rate-stars">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        <h3>شو رأيك فينا؟</h3>
        <p>تقييمك بيهمنا</p>

        <a href={baseUrl} onClick={handleClick} className="rate-cta">
          قيّمنا على فيسبوك ←
        </a>
      </div>
    </div>
  );
}