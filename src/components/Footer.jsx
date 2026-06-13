import React from "react";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        <a href="https://www.instagram.com/vip.fast.food/" target="_blank">
          <FaInstagram />
        </a>

        <a href="https://www.facebook.com/vip.tartus" target="_blank">
          <FaFacebookF />
        </a>

        <a href="https://wa.me/963930413363" target="_blank">
          <FaWhatsapp />
        </a>

        <a href="tel:‏+963930413363‏" target="_blank">
          <FaPhoneAlt />
        </a>
      </div>

      <p>© 2026 VIP FAST FOOD — ALL RIGHTS RESERVED</p>
    </footer>
  );
}