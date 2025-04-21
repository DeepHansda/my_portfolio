import "./email.css";
function EmailNumber() {
  return (
    <div className="emailNumber">
      <div className="emailNumber-address">
        <h4 className="text-secondary">Address :</h4>
        <p>Asansol, West Bengal, Pin - 713357</p>
      </div>
      <div className="contact-buttons">
        <div className="email c-button">
          <a href="mailto:deephansda921@gmail.com">
            <p>deephansda921@gmail.com</p>
          </a>
        </div>
        <div className="number c-button">
          <a href="tel:+919647750384">
            <p>+91 9647750384</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmailNumber;
