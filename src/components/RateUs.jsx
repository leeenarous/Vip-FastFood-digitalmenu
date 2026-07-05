import React from "react";

export default function RateUs() {
  const baseUrl = import.meta.env.VITE_SOME_URL;
  const isAndroid = /android/i.test(navigator.userAgent);

  const openFacebookReview = () => {
    if (!isAndroid) {
      window.open(baseUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const encodedUrl = encodeURIComponent(baseUrl);
    const start = Date.now();

    // نحاول نفتح الرابط الخاص بفيسبوك
    window.location.href = `fb://facewebmodal/f?href=${encodedUrl}`;

    // إذا بعد 1.5 ثانية لسا واقفين بنفس الصفحة (يعني ما انفتح تطبيق)
    // نرجع نفتح الرابط العادي بالمتصفح كـ fallback
    setTimeout(() => {
      const elapsed = Date.now() - start;
      // إذا الصفحة لسا ظاهرة (ما صار تبديل تطبيق) نطبق الـ fallback
      if (document.visibilityState === "visible" && elapsed < 2000) {
        window.location.href = baseUrl;
      }
    }, 1500);
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