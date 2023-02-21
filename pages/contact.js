import Image from "next/image";
import styles from "../styles/Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Api from "../lib/getData";
import { useState } from "react";

const Contact = ({ slider, profil }) => {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const redirect = () => {
    router.push("/");
  };

  const onFormSubmit = async (send) => {
    setLoad(true);
    const data = JSON.parse(JSON.stringify(send));
    if (
      !data.message ||
      !data.firstName ||
      !data.lastName ||
      !data.mail ||
      !data.phone
    ) {
      toast("Information manquante.", {
        autoClose: 4000,
        type: "error",
      });
      setLoad(false);
    } else {
      await fetch(`/api/mail`, {
        method: "POST",
        body: JSON.stringify(send),
      }).then((res) => {
        toast("Mail bien envoyé.", {
          autoClose: 4000,
          type: "success",
        });
      });
      redirect(); 
    }
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contact__left}>
        <Image
          className={styles.contact__left_picture}
          src={slider[2].pictureUrl}
          alt={"picture background of mention"}
          width={slider[2].picture[0].width}
          height={slider[2].picture[0].height}
          priority
        />
        <div className={styles.contact__left_container}>
          <div className={styles.contact__left_global}>
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
            <div className={styles.contact__left_mail}>
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
          <form
            className={styles.contact__right_form}
            onSubmit={handleSubmit(onFormSubmit)}
          >
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
                      placeholder="Prénom"
                      {...register("firstName")}
                      required
                    />
                  </td>
                  <td className={styles.contact__right_td}>
                    <input
                      className={styles.contact__right_input}
                      name="lastName"
                      type="text"
                      placeholder="Nom"
                      {...register("lastName")}
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
                      {...register("mail")}
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
                      {...register("phone")}
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
                      {...register("message")}
                      required
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.contact__right_choice}>
              <input
                type="button"
                className={styles.contact__right_back}
                onClick={redirect}
                value={`Retour a l'accueil`}
              />
              <input
                className={
                  !load
                    ? styles.contact__right_send
                    : styles.contact__right_close
                }
                type="submit"
                value="Envoyer le mail"
                disabled={!load ? "" : "disabled"}
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
  const profil = await Api("Profil", { filterByFormula: `id = 1` });
  const slider = await Api("Carousel", {});

  return {
    props: {
      profil: profil[0],
      slider,
    },
    revalidate: 1,
  };
};
