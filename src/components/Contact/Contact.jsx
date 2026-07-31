import React, { useState } from "react";
import "./Contact.scss";
import { mobileNumber, email } from "../../constants/contactConstants";

const FORM_ACTION_URL = import.meta.env.VITE_FORM_ACTION_URL;
const ENTRY_NAME = import.meta.env.VITE_ENTRY_NAME;
const ENTRY_EMAIL = import.meta.env.VITE_ENTRY_EMAIL;
const ENTRY_MESSAGE = import.meta.env.VITE_ENTRY_MESSAGE;

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    const body = new URLSearchParams();
    body.append(ENTRY_NAME, formData.name);
    body.append(ENTRY_EMAIL, formData.email);
    body.append(ENTRY_MESSAGE, formData.message);

    try {
      // no-cors means we can't read the response, but the POST still lands.
      await fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true" />

      <div className="contact-header">
        <p className="contact-sub-heading">06. Contact</p>
        <h2>GET IN TOUCH</h2>
        <p className="contact-description">
          I’m always open to discussing product ideas, creative strategies, or potential collaborations. Actively looking for  internships.
        </p>
      </div>

      <div className="contact__container">
        <div className="contact__left">
          <h2 className="contact__title">
            Let’s build <br />
            something <br />
            <span className="contact__titleAccent">impactful.</span>
          </h2>

          <p className="contact__desc">
            Actively seeking  internship opportunities. Feel free to reach out if you have a project in mind or just want to say hi! I’m always open to discussing product ideas, creative strategies, or potential collaborations.
          </p>

          <div className="contact__info">
            <a className="contact__email" href={`mailto:${email}`}>
              {email}
            </a>
            <div className="contact__phone">{mobileNumber}</div>
          </div>
        </div>

        <div className="contact__card">

           <div className="contact__statusPill">
    <span className="contact__statusDot" aria-hidden="true" />
    Open to internships
  </div>

          <form
            className="contact__form"
            onSubmit={handleSubmit}
            onKeyDownCapture={(e) => {
              const isField =
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement ||
                e.target.isContentEditable;

              if (isField && e.key === " ") e.stopPropagation();
            }}
          >
            <label className="field">
              <span className="field__label">NAME</span>
              <input
                className="field__input"
                name="name"
                placeholder="Your name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "sending"}
              />
            </label>

            <label className="field">
              <span className="field__label">EMAIL</span>
              <input
                className="field__input"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "sending"}
              />
            </label>

            <label className="field">
              <span className="field__label">MESSAGE</span>
              <textarea
                className="field__textarea"
                name="message"
                placeholder="Reaching out about a job or internship? Share role details + timeline…"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status === "sending"}
              />
            </label>

            <button type="submit" className="contact__btn" disabled={status === "sending"}>
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </button>

            {status === "sent" && (
              <p className="contact__status contact__status--success">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="contact__status contact__status--error">
                Something went wrong — try again, or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="contact__footer">
        <div className="contact__footerInner">
          <div className="contact__copyright">
            © {new Date().getFullYear()} Ananya Sinha. All rights reserved.
          </div>

          <div className="contact__links">
            <a
              href="https://www.linkedin.com/in/ananya-sinha-724421307/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ANANYA-160805"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}