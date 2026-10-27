"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Header() {
  const reduceMotion = useReducedMotion();

  return (
    <header className="header">
      <motion.div className="wrap header__inner" initial={reduceMotion ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
        <motion.a href="#top" aria-label="iDE.A home" whileHover={reduceMotion ? undefined : { scale: 1.03 }}>
          <Image src="/idea-logo.png" alt="iDE.A" width={1660} height={536} className="logo logo--header" priority />
        </motion.a>
        <nav className="nav" aria-label="Main">
          <motion.a href="#about" className="nav__link" whileHover={reduceMotion ? undefined : { y: -2 }}>About</motion.a>
          <motion.a href="#schedule" className="nav__link" whileHover={reduceMotion ? undefined : { y: -2 }}>Schedule</motion.a>
          <motion.a href="#register" className="btn btn--solid btn--sm" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}>Register</motion.a>
        </nav>
      </motion.div>
    </header>
  );
}
