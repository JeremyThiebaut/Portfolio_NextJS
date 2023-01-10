import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <p className={styles.navbar__logo}>Logo</p>
      <nav className={styles.navbar__nav}>
        <Link href="/">Accueil</Link>
        <Link href="/">Description</Link>
        <Link href="/">Mes projets</Link>
        <Link href="/">Mes documents</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default Navbar;
