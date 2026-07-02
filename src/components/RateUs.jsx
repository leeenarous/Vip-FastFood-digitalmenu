import React from "react";

export default function RateUs() {
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
          href="https://www.facebook.com/vip.tartus/reviews"
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