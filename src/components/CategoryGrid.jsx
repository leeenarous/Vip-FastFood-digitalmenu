import React from "react";
import { useNavigate } from "react-router-dom";

import LikeBox from "../components/LikeBox";
import TicTacToe from "./Tictactoe";

const categoryIcons = {
  "ساندويش دجاج مقلي": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 46 Q14 38 18 28 Q24 16 36 18 Q48 20 50 32 Q52 42 44 48 Q34 56 18 46Z" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <path d="M20 44 Q17 37 20 28 Q25 18 36 20 Q46 22 48 32 Q50 40 43 46 Q34 53 20 44Z" fill="#F5C040" opacity="0.5"/>
    <path d="M24 40 Q20 34 22 26 Q27 18 36 20" stroke="#C87020" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    <circle cx="30" cy="30" r="3.5" fill="#D49020" stroke="#8A5010" stroke-width="1"/>
    <circle cx="40" cy="34" r="3" fill="#D49020" stroke="#8A5010" stroke-width="1"/>
    <circle cx="34" cy="42" r="3" fill="#D49020" stroke="#8A5010" stroke-width="1"/>
    <path d="M28 16 Q26 10 30 8 Q36 6 36 12" fill="#C87820" stroke="#7A4A00" stroke-width="1.2"/>
    <path d="M36 14 Q40 8 44 10 Q48 14 42 18" fill="#C87820" stroke="#7A4A00" stroke-width="1.2"/>
  </svg>`,

  "ساندويش دجاج مشوي": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <line x1="8" y1="56" x2="56" y2="8" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="20" cy="44" rx="9" ry="7" fill="#E8A020" stroke="#A06010" stroke-width="1.5" transform="rotate(-45 20 44)"/>
    <ellipse cx="20" cy="44" rx="7" ry="5" fill="#F5C040" opacity="0.5" transform="rotate(-45 20 44)"/>
    <path d="M16 48 Q18 44 22 40" stroke="#C87020" stroke-width="1.2" stroke-linecap="round"/>
    <ellipse cx="32" cy="32" rx="9" ry="7" fill="#E8A020" stroke="#A06010" stroke-width="1.5" transform="rotate(-45 32 32)"/>
    <ellipse cx="32" cy="32" rx="7" ry="5" fill="#F5C040" opacity="0.5" transform="rotate(-45 32 32)"/>
    <path d="M28 36 Q30 32 34 28" stroke="#C87020" stroke-width="1.2" stroke-linecap="round"/>
    <ellipse cx="44" cy="20" rx="9" ry="7" fill="#E8A020" stroke="#A06010" stroke-width="1.5" transform="rotate(-45 44 20)"/>
    <ellipse cx="44" cy="20" rx="7" ry="5" fill="#F5C040" opacity="0.5" transform="rotate(-45 44 20)"/>
    <path d="M40 24 Q42 20 46 16" stroke="#C87020" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  "برغر دجاج": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 38 Q10 46 32 48 Q54 46 54 38 L54 34 Q32 38 10 34Z" fill="#C8860A" stroke="#7A4A00" stroke-width="1.5"/>
    <rect x="10" y="28" width="44" height="7" fill="#E85030" stroke="#A03010" stroke-width="1.5" rx="1"/>
    <rect x="10" y="22" width="44" height="7" fill="#F0E060" stroke="#A08010" stroke-width="1.5" rx="1"/>
    <rect x="10" y="17" width="44" height="6" fill="#5A9A30" stroke="#2A6A10" stroke-width="1.5" rx="1"/>
    <path d="M10 16 Q10 8 32 6 Q54 8 54 16Z" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <ellipse cx="32" cy="8" rx="20" ry="4" fill="#F5C040" stroke="#A06010" stroke-width="1"/>
    <circle cx="24" cy="10" r="2.5" fill="#fff" opacity="0.25"/>
  </svg>`,

  "شاورما": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="58" rx="18" ry="4" fill="#3a1800" opacity="0.4"/>
    <path d="M16 54 Q14 32 20 20 Q24 12 32 12 Q40 12 44 20 Q50 32 48 54Z" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <path d="M18 52 Q17 32 22 22 Q26 15 32 15 Q38 15 42 22 Q47 32 46 52Z" fill="#F5C040" opacity="0.45"/>
    <path d="M20 42 Q32 38 44 42" stroke="#8B4513" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 48 Q32 44 44 48" stroke="#8B4513" stroke-width="2" stroke-linecap="round"/>
    <path d="M21 36 Q32 32 43 36" stroke="#CC4020" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M22 30 Q32 26 42 30" stroke="#CC4020" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="32" cy="20" rx="12" ry="5" fill="#D49020" stroke="#8A5010" stroke-width="1.5"/>
    <ellipse cx="32" cy="18" rx="10" ry="4" fill="#F5C040"/>
    <rect x="29" y="11" width="6" height="9" rx="2" fill="#8B4513" stroke="#5A2A00" stroke-width="1"/>
  </svg>`,

  "سندويش بطاطا": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 54 Q18 60 32 62 Q46 60 44 54Z" fill="#C8860A" stroke="#7A4A00" stroke-width="1.5"/>
    <path d="M20 54 L22 40 Q32 36 42 40 L44 54Z" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <rect x="22" y="16" width="8" height="26" rx="4" fill="#F5C840" stroke="#A08010" stroke-width="1.5"/>
    <rect x="28" y="12" width="8" height="30" rx="4" fill="#F5C840" stroke="#A08010" stroke-width="1.5"/>
    <rect x="34" y="14" width="8" height="28" rx="4" fill="#F5C840" stroke="#A08010" stroke-width="1.5"/>
    <rect x="23" y="16" width="3" height="22" rx="1.5" fill="#fff" opacity="0.2"/>
    <rect x="29" y="12" width="3" height="26" rx="1.5" fill="#fff" opacity="0.2"/>
    <rect x="35" y="14" width="3" height="24" rx="1.5" fill="#fff" opacity="0.2"/>
  </svg>`,

  "مقبلات": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="52" rx="24" ry="6" fill="#C8860A" stroke="#7A4A00" stroke-width="1.5"/>
    <ellipse cx="32" cy="50" rx="22" ry="5" fill="#E8A020" stroke="#A06010" stroke-width="1"/>
    <rect x="14" y="28" width="10" height="24" rx="5" fill="#F5C840" stroke="#A08010" stroke-width="1.5"/>
    <rect x="15" y="28" width="4" height="20" rx="2" fill="#fff" opacity="0.2"/>
    <rect x="26" y="22" width="10" height="30" rx="5" fill="#F5C840" stroke="#A08010" stroke-width="1.5"/>
    <rect x="27" y="22" width="4" height="26" rx="2" fill="#fff" opacity="0.2"/>
    <rect x="38" y="25" width="10" height="27" rx="5" fill="#F5C840" stroke="#A08010" stroke-width="1.5"/>
    <rect x="39" y="25" width="4" height="23" rx="2" fill="#fff" opacity="0.2"/>
    <circle cx="19" cy="38" r="3" fill="#E85020" stroke="#A03010" stroke-width="1"/>
    <circle cx="31" cy="34" r="3" fill="#E85020" stroke="#A03010" stroke-width="1"/>
    <circle cx="43" cy="36" r="3" fill="#E85020" stroke="#A03010" stroke-width="1"/>
  </svg>`,

  "سلطات": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 36 Q12 52 32 54 Q52 52 54 36Z" fill="#D8EEB0" stroke="#5A8A20" stroke-width="1.5"/>
    <path d="M8 32 Q10 26 32 24 Q54 26 56 32 Q54 38 32 40 Q10 38 8 32Z" fill="#4A8A28" stroke="#2A6A10" stroke-width="1.5"/>
    <path d="M10 32 Q12 28 32 26 Q52 28 54 32 Q52 36 32 38 Q12 36 10 32Z" fill="#6AAA38" opacity="0.5"/>
    <circle cx="24" cy="44" r="5" fill="#E82010" stroke="#A01008" stroke-width="1.2"/>
    <circle cx="32" cy="48" r="4.5" fill="#E82010" stroke="#A01008" stroke-width="1.2"/>
    <circle cx="40" cy="44" r="5" fill="#E82010" stroke="#A01008" stroke-width="1.2"/>
    <circle cx="28" cy="50" r="3" fill="#F5C020" stroke="#A08010" stroke-width="1"/>
    <circle cx="36" cy="50" r="3" fill="#F5C020" stroke="#A08010" stroke-width="1"/>
    <circle cx="24" cy="43" r="2" fill="#fff" opacity="0.25"/>
  </svg>`,

  "بيتزا حجم وسط": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6 L54 50 Q32 56 10 50Z" fill="#E8A020" stroke="#A06010" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M32 6 L54 50 Q32 56 10 50Z" fill="#E84030" opacity="0.75"/>
    <path d="M32 12 L50 48 Q32 53 14 48Z" fill="#E84030" stroke="#A03010" stroke-width="1"/>
    <circle cx="28" cy="32" r="4" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="38" cy="38" r="3.5" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="24" cy="44" r="3" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="26" cy="30" r="2" fill="#CC2010"/>
    <circle cx="36" cy="36" r="2" fill="#CC2010"/>
    <path d="M30 8 Q32 4 34 8" stroke="#E8A020" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`,

  "بيتزا حجم كبير": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="24" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <circle cx="32" cy="36" r="20" fill="#E84030" stroke="#A03010" stroke-width="1"/>
    <circle cx="32" cy="36" r="16" fill="#F04040" opacity="0.6"/>
    <circle cx="24" cy="30" r="4.5" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="40" cy="32" r="4" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="30" cy="44" r="4" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="42" cy="44" r="3.5" fill="#F5F0D0" stroke="#C8C890" stroke-width="1"/>
    <circle cx="23" cy="40" r="2.5" fill="#CC2010"/>
    <circle cx="38" cy="26" r="2.5" fill="#CC2010"/>
    <circle cx="44" cy="37" r="2" fill="#F5C030"/>
  </svg>`,

  "مشروبات": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 56 Q20 60 32 62 Q44 60 44 56 L42 20 L22 20Z" fill="#2255AA" stroke="#0A2A70" stroke-width="1.5"/>
    <path d="M20 56 Q20 60 32 62 Q44 60 44 56 L42 20 L22 20Z" fill="#4488DD" opacity="0.35"/>
    <rect x="18" y="14" width="28" height="8" rx="4" fill="#1A44AA" stroke="#0A2A70" stroke-width="1.5"/>
    <ellipse cx="32" cy="14" rx="14" ry="3" fill="#3366CC" stroke="#0A2A70" stroke-width="1"/>
    <path d="M24 32 Q32 28 40 32" stroke="#88CCFF" stroke-width="2" stroke-linecap="round"/>
    <path d="M23 42 Q32 38 41 42" stroke="#88CCFF" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M22 52 Q32 48 42 52" stroke="#88CCFF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M40 16 Q48 10 46 4" stroke="#4488DD" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="46" cy="3" r="3.5" fill="#66AAFF" stroke="#2255AA" stroke-width="1"/>
    <ellipse cx="26" cy="17" rx="5" ry="2" fill="#fff" opacity="0.2"/>
  </svg>`,
  "الإضافات": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="44" r="10" fill="#E85020" stroke="#A03010" stroke-width="1.5"/>
    <circle cx="20" cy="44" r="7" fill="#F06030" opacity="0.6"/>
    <path d="M16 41 Q20 38 24 41" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    <rect x="34" y="34" width="20" height="20" rx="4" fill="#F5C840" stroke="#A08010" stroke-width="1.5" transform="rotate(15 44 44)"/>
    <rect x="37" y="37" width="14" height="14" rx="2" fill="#fff" opacity="0.15" transform="rotate(15 44 44)"/>
    <ellipse cx="32" cy="18" rx="14" ry="6" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <ellipse cx="32" cy="16" rx="11" ry="4.5" fill="#F5C040"/>
    <path d="M22 14 Q26 10 32 11 Q38 10 42 14" stroke="#A06010" stroke-width="1" opacity="0.5" fill="none"/>
  </svg>`,

  "وجبات دجاج": `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#E8A020" stroke="#A06010" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="24" fill="#F5D080" stroke="#C8A050" stroke-width="1"/>
    <circle cx="32" cy="32" r="20" fill="#FBE8C0"/>
    <ellipse cx="24" cy="26" rx="9" ry="6" fill="#D49020" stroke="#8A5010" stroke-width="1.2" transform="rotate(-20 24 26)"/>
    <ellipse cx="40" cy="24" rx="8" ry="6" fill="#E8A020" stroke="#A06010" stroke-width="1.2" transform="rotate(15 40 24)"/>
    <ellipse cx="22" cy="40" rx="8" ry="5.5" fill="#E8A020" stroke="#A06010" stroke-width="1.2" transform="rotate(25 22 40)"/>
    <ellipse cx="40" cy="40" rx="8.5" ry="6" fill="#D49020" stroke="#8A5010" stroke-width="1.2" transform="rotate(-15 40 40)"/>
    <circle cx="32" cy="32" r="4" fill="#5A9A30" opacity="0.85"/>
    <circle cx="26" cy="34" r="2.5" fill="#5A9A30" opacity="0.7"/>
    <circle cx="38" cy="30" r="2" fill="#E85030" opacity="0.8"/>
  </svg>`,
};

const defaultIcon = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="24" fill="#ff6b35" opacity="0.4" stroke="#ff6b35" stroke-width="1.5"/>
  <path d="M20 32h24M32 20v24" stroke="#ffcc00" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export default function CategoryGrid({ categories, groupedMenu, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="category-card skeleton" key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <>
    <section className="grid">
      {categories.map((category) => {
        const svgIcon = categoryIcons[category] || defaultIcon;
        return (
          <div
            key={category}
            className="category-card"
            onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
          >
            <div className="category-image-wrapper">
              <div
                className="svg-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: svgIcon }}
              />
            </div>
            <h3>{category}</h3>
          </div>
        );
      })}

    </section>
     <LikeBox/>
     <TicTacToe/>
  </>
  );

}
