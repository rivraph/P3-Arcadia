import "../styles/Contact.css";

function Contact() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLTextAreaElement)
      .value;

    // Construire l'URL mailto
    const mailtoLink = `mailto:contact@arcadia.com?subject=Contact from ${encodeURIComponent(
      email,
    )}&body=${encodeURIComponent(message)}`;

    // Rediriger l'utilisateur vers son client mail
    window.location.href = mailtoLink;
  };

  return (
    <div className="contactmaincontener">
      <div className="contactcontener">
        <h1>Contact</h1>
        <form className="contactform" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
