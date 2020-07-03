import React from "react";

function ContactUs() {
  return (
    <section className="text-block gradient">
      <h1>Contact Us.</h1>
      <p className="paragraph">
        Want to get into touch with us? Email <span className="email">mail.drishtifoundation@gmail.com</span> or click the link below!
      </p>
      <button className="contact-btn" aria-label="Email us">
        <a href="mailto:mail.drishtifoundation@gmail.com" title="Contact Us" tabIndex={12}>
          Contact Us
        </a>
      </button>
    </section>
  );
}

export default ContactUs;
