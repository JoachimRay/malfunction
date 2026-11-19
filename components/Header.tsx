"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import RegistrationClosedButton from "./RegistrationClosedButton";

const MotionLink = motion.create(Link);

export default function Header() {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : { y: -2 };

  return (
    <header className="header">
      <motion.div
        className="wrap header__inner"
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <MotionLink
          href="/"
          aria-label="iDE.A home"
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        >
          <Image
            src="/idea-logo.png"
            alt="iDE.A"
            width={1660}
            height={536}
            className="logo logo--header"
            priority
          />
        </MotionLink>
        <nav className="nav" aria-label="Main">
          <MotionLink href="/#about" className="nav__link" whileHover={hover}>
            About
          </MotionLink>
          <MotionLink href="/#schedule" className="nav__link" whileHover={hover}>
            Schedule
          </MotionLink>
          <MotionLink href="/timer" className="nav__link" whileHover={hover}>
            Timer
          </MotionLink>
          <RegistrationClosedButton className="btn btn--solid btn--sm">
            Register
          </RegistrationClosedButton>
        </nav>
      </motion.div>
    </header>
  );
}