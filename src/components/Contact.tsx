import "../styles/contact.css";

export default function ContactWindow() {
    return (
      <div className="contact-container">
        <h1 className="contact-title">Get in touch!</h1>
  
        <p className="contact-subtitle">
          the easiest way to contact me is through email or linkedin.
        </p>
  
        <img
          src="../src/assets/images/voidknight.png"
          alt="Mailcat"
          className="contact-illustration"
        />
  
        <p className="contact-email">
          email me at: <a href="mailto:alanjc27@gmail.com">alanjc27@gmail.com</a>
        </p>
  
        <p className="contact-gray">
          or press the icons below to open your apps.
        </p>
  
        <a href="mailto:alanjc27@gmail.com" className="contact-button">
          <img className="contact-social" src='src/assets/icons/gmail.png'/>
        </a>
        <a href="https://www.linkedin.com/in/alanjaviercanellas/" className="contact-button" target="_blank">
          <img className="contact-social" src='src/assets/icons/linkedin.svg'/>
        </a>
      </div>
    );
  }
  