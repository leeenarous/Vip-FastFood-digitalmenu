import React from "react";

export default function RateUs() {
  const url = import.meta.env.VITE_SOME_URL;
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

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rate-cta"
        >
          قيّمنا على فيسبوك ←
        </a>
      </div>
    </div>
  );
}