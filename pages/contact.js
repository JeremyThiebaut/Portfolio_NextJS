import Image from "next/image";
import styles from "../styles/Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const Airtable = require("airtable");
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

const Contact = ({ slider, profil }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onFormSubmit = (send) => {
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
    } else {
      const response = fetch(`/api/mail`, {
        method: "POST",
        body: JSON.stringify(send),
      }).then((res) => {
        toast("Mail bien envoyé.", {
          autoClose: 4000,
          type: "success",
        });
        router.push("/");
      });
    }
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contact__left}>
        <Image
          className={styles.contact__left_picture}
          src={slider[2].picture[0].thumbnails.full.url}
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
                      placeholder="Nom"
                      {...register("firstName")}
                      required
                    />
                  </td>
                  <td className={styles.contact__right_td}>
                    <input
                      className={styles.contact__right_input}
                      name="lastName"
                      type="text"
                      placeholder="Prénom"
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
  const Api = async (data, filter) => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
      AIRTABLE_BASE_ID
    );

    const response = await base(data)
      .select(filter)
      .firstPage()
      .catch((e) => {
        console.log(e);
      });

    const records = response.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });
    return records;
  };

  const profil = await Api("Profil", { filterByFormula: `id = 1` });
  const slider = await Api("Carousel", {});

  return {
    props: {
      profil: profil[0],
      slider,
    },
    revalidate: 60,
  };
};
