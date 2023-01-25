import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    const closeDropdown = (e) => {
      const pathClick = e.composedPath()[0].className;
      console.log(pathClick);
      if (pathClick !== styles.navbar__nav_phone_open) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className={styles.navbar} id="navBar">
      <p className={styles.navbar__logo}>Logo</p>
      <nav className={styles.navbar__nav_windows}>
        <Link href="/">Accueil</Link>
        <Link href="/#description">Description</Link>
        <Link href="/#project">Mes projets</Link>
        <Link href="/#document">Mes documents</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <div
        className={
          !open ? styles.navbar__nav_phone : styles.navbar__nav_phone_open
        }
        onClick={toggleOpen}
      >
        <span></span>
      </div>
      {open && (
        <div className={styles.navbar__nav_linkPhone}>
          <Link href="/">Accueil</Link>
          <Link href="/#description">Description</Link>
          <Link href="/#project">Mes projets</Link>
          <Link href="/#document">Mes documents</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
