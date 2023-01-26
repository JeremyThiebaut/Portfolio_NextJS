import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.scss";

const Navbar = ({ logo }) => {
  const router = useRouter();
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
      if (pathClick !== styles.navbar__nav_phone_open) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const redirect = () => {
    router.push("/");
  };

  return (
    <div className={styles.navbar} id="navBar">
      <div className={styles.navbar__container}>
        <Image
          className={styles.navbar__logo}
          src={logo.thumbnails.large.url}
          alt={`image du site ${logo.title}`}
          width={logo.width}
          height={logo.height}
          priority
          onClick={redirect}
        />
        <nav className={styles.navbar__nav_windows}>
          <Link href="/" scroll>
            Accueil
          </Link>
          <Link href="/#description" scroll>
            Description
          </Link>
          <Link href="/#project" scroll>
            Mes projets
          </Link>
          <Link href="/#document" scroll>
            Mes documents
          </Link>
          <Link href="/contact" scroll>
            Contact
          </Link>
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
    </div>
  );
};

export default Navbar;
