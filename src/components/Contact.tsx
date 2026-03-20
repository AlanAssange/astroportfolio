import "../styles/contact.css";
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
        src="../src/assets/images/voidknight.png"
        alt="Mailcat"
        className="contact-illustration"
      />

      <p className="contact-email">
      {t("contact.email")} <a href="mailto:alanjc27@gmail.com">{t("contact.emailDom")}</a>
      </p>

      <p className="contact-gray">
      {t("contact.emailPress")}
      </p>

      <a href="mailto:alanjc27@gmail.com" className="contact-button" target="_blank"> 
        <img className="contact-social" src='src/assets/icons/gmail.png' />
      </a>
      <a href="https://www.linkedin.com/in/alanjaviercanellas/" className="contact-button" target="_blank">
        <img className="contact-social" src='src/assets/icons/linkedin.svg' />
      </a>
    </div>
  );
}
