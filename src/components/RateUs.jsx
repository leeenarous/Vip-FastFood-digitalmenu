import React, { useState } from "react";

export default function RateUs() {
  const baseUrl = import.meta.env.VITE_SOME_URL;
  const [copied, setCopied] = useState(false);

  const isAndroid = /android/i.test(navigator.userAgent);

  const handleClick = async (e) => {
    if (!isAndroid) return; 

    e.preventDefault();

    const cleanUrl = baseUrl.replace("https://", "");
    window.location.href = `intent://${cleanUrl}#Intent;scheme=https;end`;
    try {
      await navigator.clipboard.writeText(baseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (err) {
      console.log("Clipboard not available");
    }
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

        
        <a  href={baseUrl}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="rate-cta"
        >
          قيّمنا على فيسبوك ←
        </a>

        {copied && (
          <p className="copy-hint">
           Chrome
          </p>
        )}
      </div>
    </div>
  );
}