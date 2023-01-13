import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = ({ siret }) => {
  return (
    <div className={styles.footer}>
      <Link className={styles.footer__link} href="/mention">
        Mention légales
      </Link>
      <span>© Copyright 2022 - JTDev Freelance</span>
      <span>
        SIRET : <strong>{siret}</strong>
      </span>
    </div>
  );
};

export default Footer;
