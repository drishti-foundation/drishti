import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import banner from "./banner.jpg";
import drishti from "#pics/drishti.png";

function About() {
  const [showNav, setShowNav] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current !== null) {
      const observer = new IntersectionObserver(
        (entries) => {
          setShowNav(entries[0].intersectionRatio < 0.1);
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(bannerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [bannerRef]);

  return (
    <div className="about">
      <nav className="nav-bar absolute-nav" style={showNav ? { transform: "translateY(0)" } : { transform: "translateY(-100%)" }}>
        <img src={drishti} alt="logo" />
        <div className="btn-wrapper">
          <Link className="btn" to="/demo">
            Translate Now
          </Link>
        </div>
      </nav>
      <div className="banner" ref={bannerRef}>
        <img src={banner} alt="grass" />
        <div className="center">
          <h1>Drishti</h1>
          <Link className="btn" to="/demo">
            Translate Now
          </Link>
        </div>
      </div>
      <div className="content">
        <div>
          <p>
            India is home to one third of the blind people in the world. Yet, the conventional Braille system favours only the english
            speaking population. Over two thirds of the indian population resides in rural areas. India being a developing country, the
            literacy rate and access to technology is extremely disproportionate. This difference is especially stark when it comes to the
            rural population where the use english is limited.
          </p>
        </div>
        <br />
        <p>
          Those who don&apos;t know english, there is a barrier in access to eduction, since most educational content is in english. Though
          there are multiple translation softwares for indigenous languages, the visually impaired can not avail the benefits.
        </p>
        <br />
        <p>
          This was the inspiration for our project Drishti. Our software uses the Bharati Braille convention to translate online books and
          PDFs to indigeous braille. With Drishti, we aim to empower the visually impaired population with the gift of knowledge.
        </p>
        <div style={{ height: window.innerHeight }}></div>
      </div>
    </div>
  );
}

export default About;
