import Image from "next/image";
import axios from "axios";
import styles from "../styles/Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Contact = ({ slider, profil }) => {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onFormSubmit();
  };

  const onFormSubmit = () => {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/mail`, {
      method: "POST",
      body: JSON.stringify({ message, firstName, lastName, mail, phone }),
      headers: {
        "Contenr-Type": "application/json",
      },
    }).then((res) => {
      toast("Mail bien envoyé.", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      router.push("/");
    });
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contact__left}>
        <Image
          className={styles.contact__left_picture}
          src={slider[2].picture[0].url}
          alt={"picture background of mention"}
          width={slider[2].picture[0].width}
          height={slider[2].picture[0].height}
          priority
        />
        <div className={styles.contact__left_container}>
          <div>
            <div className={styles.contact__left_phone}>
              <div className={styles.contact__left_logo}>
                <FontAwesomeIcon
                  className={styles.contact__left_icon}
                  icon={faPhone}
                  aria-hidden="true"
                />
                <p className={styles.contact__left_text}>Nous appeler :</p>
              </div>
              <Link href={`tel:${profil.phone}`}>{profil.phone}</Link>
            </div>
            <div className={styles.contact__mail}>
              <div className={styles.contact__left_logo}>
                <FontAwesomeIcon
                  className={styles.contact__left_icon}
                  icon={faEnvelope}
                  aria-hidden="true"
                />
                <p className={styles.contact__left_text}>
                  Notre adresse mail :
                </p>
              </div>
              <Link href={`mailto:${profil.mail}`} target="_blank">
                {profil.mail}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contact__right}>
        <div className={styles.contact__right_container}>
          <form className={styles.contact__right_form} onSubmit={handleSubmit}>
            <h2 className={styles.contact__right_title}>
              Envoyez-nous un email
            </h2>
            <table className={styles.contact__right_table}>
              <tbody>
                <tr>
                  <td className={styles.contact__right_td_title} colSpan="2">
                    Entrer votre Nom/Prénom *
                  </td>
                </tr>
                <tr>
                  <td className={styles.contact__right_td}>
                    <input
                      className={styles.contact__right_input}
                      name="firstName"
                      type="text"
                      placeholder="Nom"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      required
                    />
                  </td>
                  <td className={styles.contact__right_td}>
                    <input
                      className={styles.contact__right_input}
                      name="lastName"
                      type="text"
                      placeholder="Prénom"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className={styles.contact__right_table}>
              <tbody>
                <tr>
                  <td className={styles.contact__right_td_title}>
                    Entrer votre adresse email *
                  </td>
                </tr>
                <tr>
                  <td className={styles.contact__right_td}>
                    <input
                      className={styles.contact__right_input}
                      name="mail"
                      type="email"
                      placeholder="Ex: exemple@email.com"
                      onChange={(e) => setMail(e.target.value)}
                      value={mail}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className={styles.contact__right_table}>
              <tbody>
                <tr>
                  <td className={styles.contact__right_td_title}>
                    Entrer votre numéro de téléphone *
                  </td>
                </tr>
                <tr>
                  <td className={styles.contact__right_td}>
                    <input
                      className={styles.contact__right_input}
                      type="tel"
                      pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                      placeholder="+33 6 00 00 00 00"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className={styles.contact__right_table}>
              <tbody>
                <tr>
                  <td className={styles.contact__right_td_title}>Message *</td>
                </tr>
                <tr>
                  <td className={styles.contact__right_td}>
                    <textarea
                      className={styles.contact__right_input}
                      type="text"
                      placeholder="Ecrivez votre message"
                      name="message"
                      rows="5"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      required
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.contact__right_choice}>
              <Link
                className={styles.contact__right_back}
                href="/"
              >{`Retour a l'accueil`}</Link>
              <input
                className={styles.contact__right_send}
                type="submit"
                value="Envoyer le mail"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

export const getStaticProps = async () => {
  const myProfil = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/profil`,
    data: { id: 1 },
  });

  const sliders = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/slider`
  );
  const { slider } = await sliders.json();
  return {
    props: {
      profil: myProfil.data.profil[0],
      slider,
    },
  };
};
