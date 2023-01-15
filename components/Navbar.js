import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar} id="navBar">
      <p className={styles.navbar__logo}>Logo</p>
      <nav className={styles.navbar__nav}>
        <Link href="/">Accueil</Link>
        <Link href="/#description">Description</Link>
        <Link href="/#project">Mes projets</Link>
        <Link href="/#document">Mes documents</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default Navbar;
