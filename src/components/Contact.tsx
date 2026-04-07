import "../styles/contact.css";
import cosmicKnight from "../assets/images/voidknight.png";
import linkedIn from "../assets/icons/linkedin.svg"
import gmail from "../assets/icons/gmail.png";
import { useTranslation } from 'react-i18next';

export default function ContactWindow() {
  const { t } = useTranslation();
  return (
    <div className="contact-container">
      <h1 className="contact-title">{t("contact.contactTitle")}</h1>

      <p className="contact-subtitle">
      {t("contact.contactSubtitle")}
      </p>

      <img
        src={cosmicKnight.src}
        alt="Mailcat"
        className="contact-illustration"
      />

      <p className="contact-email">
      {t("contact.email")} <a href="mailto:alan.codeworks@protonmail.com">{t("contact.emailDom")}</a>
      </p>

      <p className="contact-gray">
      {t("contact.emailPress")}
      </p>

      <a href="mailto:alan.codeworks@protonmail.com" className="contact-button" target="_blank"> 
        <img className="contact-social" src={gmail.src} />
      </a>
      <a href="https://www.linkedin.com/in/alanjaviercanellas/" className="contact-button" target="_blank">
        <img className="contact-social" src={linkedIn.src} />
      </a>
    </div>
  );
}
