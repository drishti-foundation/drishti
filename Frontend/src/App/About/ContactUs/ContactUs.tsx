import React from "react";

function ContactUs() {
  return (
    <div className="text-block gradient">
      <h1>Contact Us.</h1>
      <p className="paragraph">
        Want to get into touch with us? Email <span className="email">mail.drishtifoundation@gmail.com</span> or click the link below!
      </p>
      <button className="contact-btn">
        <a href="mailto:mail.drishtifoundation@gmail.com">Contact Us</a>
      </button>
    </div>
  );
}

export default ContactUs;
