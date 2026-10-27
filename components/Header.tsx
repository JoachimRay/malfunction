import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" aria-label="iDE.A home">
          <Image src="/idea-logo.png" alt="iDE.A" width={1660} height={536} className="logo logo--header" priority />
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#about" className="nav__link">About</a>
          <a href="#schedule" className="nav__link">Schedule</a>
          <a href="#register" className="btn btn--solid btn--sm">Register</a>
        </nav>
      </div>
    </header>
  );
}
