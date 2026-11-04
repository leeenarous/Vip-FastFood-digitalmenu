import React, { useState } from "react";

export default function LikeBox() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [thanks, setThanks] = useState(false);

  const moveButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="like-box"
      onTouchStart={moveButton}
      style={{ touchAction: "none" }}
    >
      <h3>حبيت و لا ما حبيت ؟</h3>

      <button className="yes-btn" onClick={() => setThanks(true)} type="button">
        👍حبيت
      </button>

      <button
        type="button"
        className="no-btn"
        onMouseEnter={moveButton}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          touchAction: "none",
        }}
      >
        ما حبيت 👎
      </button>

      {thanks && (
        <p className="thanks-msg"><span>❤️</span>دخيل عينك <span>❤️</span></p>
      )}
    </div>
  );
}