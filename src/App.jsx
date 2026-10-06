import React, { useState } from "react";
import "./App.css";

const emptyForm = { name: "", phone: "", email: "", message: "" };

function ContactForm() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (Object.values(formData).some((value) => !value.trim())) {
      setStatus("Toate câmpurile sunt obligatorii!");
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      console.log("Date trimise:", formData);
      setStatus("Mesaj trimis cu succes!");
      setIsSubmitting(false);

      window.setTimeout(() => {
        setFormData(emptyForm);
        setStatus("");
      }, 3000);
    }, 1500);
  }

  return (
    <section className="contact-form">
      <header className="contact-form__header">
        <div className="contact-form__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2>Ia legătura cu noi</h2>
        <p>Completează formularul și îți vom răspunde în cel mai scurt timp</p>
      </header>

      <form className="contact-form__fields" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="contact-name">Nume complet</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ion Popescu"
            autoComplete="name"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-phone">Număr de telefon</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0712 345 678"
            autoComplete="tel"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Adresa de email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ion.popescu@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-message">Mesajul tău</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Scrie aici mesajul tău..."
            required
          />
        </div>

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span>Se trimite...</span>
            </>
          ) : (
            <>
              <span>Trimite mesajul</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </>
          )}
        </button>
      </form>

      {status && (
        <p
          className={`form-status ${
            status.includes("succes") ? "form-status--success" : "form-status--error"
          }`}
          role="status"
        >
          {status}
        </p>
      )}
    </section>
  );
}

const contactDetails = [
  {
    title: "Telefon",
    value: "+40 712 345 678",
    color: "blue",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
  {
    title: "Email",
    value: "contact@exemplu.ro",
    color: "purple",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Locație",
    value: "București, România",
    color: "green",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  },
];

function App() {
  return (
    <main className="page">
      <div className="page__decoration page__decoration--purple" aria-hidden="true" />
      <div className="page__decoration page__decoration--blue" aria-hidden="true" />

      <div className="page__content">
        <div className="page__container">
          <header className="page-header">
            <h1>Contact</h1>
            <p>
              Avem cele mai bune soluții pentru tine. Completează formularul și să începem o
              colaborare de succes!
            </p>
          </header>

          <ContactForm />

          <section className="contact-details" aria-label="Date de contact">
            {contactDetails.map(({ title, value, color, icon }) => (
              <article className="detail-card" key={title}>
                <div className={`detail-card__icon detail-card__icon--${color}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    {icon}
                  </svg>
                </div>
                <h3>{title}</h3>
                <p>{value}</p>
              </article>
            ))}
          </section>

          <footer className="page-footer">
            <p>&copy; 2024 Aplicația de contact. Toate drepturile rezervate.</p>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default App;
