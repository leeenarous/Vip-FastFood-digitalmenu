import React from "react";
import { FaHamburger } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  return (
    <>
    <header className="header">
      <div className="logo-wrapper">

        <motion.h1
        className="main-title " id="fire-text">
          VIP <span>FAST FOOD</span>
        </motion.h1>
      </div>


<p className="subtitle">
  🔥 لديكم ... لا خوف عليكم ...
  <span className="vip">VIP</span>
  🔥
</p>
    
    </header>
    </>
  );
}