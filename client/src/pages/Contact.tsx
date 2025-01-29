import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contactmaincontener">
      <div className="contactcontener">
        <h1>Contact</h1>
        <form className="contactform">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required>
            {" "}
          </textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
