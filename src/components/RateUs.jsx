import React from "react";

export default function RateUs() {
  const baseUrl = import.meta.env.VITE_SOME_URL;

  const getFacebookUrl = () => {
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isAndroid) {
      const cleanUrl = baseUrl.replace("https://", "");
      return `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    }

    return baseUrl;
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = getFacebookUrl();
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

        
          href={baseUrl}
          onClick={handleClick}
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