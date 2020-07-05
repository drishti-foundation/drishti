import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Profile from "./Profile";
import AnimateIntoView from "./AnimateIntoView";

import banner from "./banner.jpg";
import demo0 from "#pics/demo0.png";
import demo1 from "#pics/demo1.png";
import demo2 from "#pics/demo2.png";
import groupImg from "#pics/group.jpg";
import drishti from "#pics/drishti.png";

function About() {
  const [showNav, setShowNav] = useState(false);
  const bannerRef = useRef<HTMLHeadingElement>(null);

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
      <nav className={`nav-bar absolute-nav ${showNav ? "-show" : "-hide"}`} aria-hidden={!showNav}>
        <div className="img-wrapper">
          <img src={drishti} alt="drishti logo" />
        </div>
        <div className="btn-wrapper">
          <Link className="btn" to="/demo" aria-label="Translate Now">
            Translate Now
          </Link>
        </div>
      </nav>
      <header className="banner" ref={bannerRef}>
        <img src={banner} alt="blind child in a field" />
        <div className="center">
          <h1>Drishti</h1>
          <Link className="btn" to="/demo" tabIndex={1} aria-label="Translate Now" title="Translate Now">
            Translate Now
          </Link>
        </div>
      </header>
      <main className="content">
        <AnimateIntoView type="ul" className="stats">
          <li className="info-card">
            <div></div>
            {well}
            <h1>60%</h1>
            <p>of people live in rural India.</p>
            <div></div>
          </li>
          <li className="info-card">
            <div></div>
            {blind}
            <h1>22%</h1>
            <p>of all blind people in the world reside in India.</p>
            <div></div>
          </li>
          <li className="info-card">
            <div></div>
            {knowledge}
            <h1>10%</h1>
            <p>of Indians are literate in English.</p>
            <div></div>
          </li>
        </AnimateIntoView>
        <AnimateIntoView type="section" className="text-block">
          <p className="paragraph">
            Most of India&apos;s visually impaired live in rural India. Almost all of them do not have access to quality education in their
            own language.
          </p>
          <h2>This is where we come in.</h2>
          <p className="paragraph">
            With Drishti, we aim to empower the visually impaired population with the gift of knowledge. Our software uses the Bharati
            Braille convention to translate online books and PDFs to indigeous braille. In this way{" "}
            <span className="highlight">Drishti</span> empowers the visually impaired to read in their own language.
          </p>
        </AnimateIntoView>
        <AnimateIntoView type="section" className="text-block gradient demo-section">
          <h1>How to use.</h1>
          <div className="demo-wrapper">
            <AnimateIntoView type="img" src={demo0} alt="basic page layout" className="demo-img" />
            <AnimateIntoView
              type="img"
              src={demo1}
              alt="uploading file by clicking on center of the screen, and send for processing"
              className="demo-img"
            />
            <AnimateIntoView type="img" src={demo2} alt="download translated pdf" className="demo-img" />
            <Link className="btn" to="/demo" tabIndex={2} aria-label="Translate Now">
              Translate Now
            </Link>
          </div>
        </AnimateIntoView>
        <AnimateIntoView type="section" className="text-block">
          <h1>About Us.</h1>
          <p className="paragraph">
            We are a group of high school students from National Public School Indiranagar, Bangalore. We like to use our passion for
            Computer Science to help improve the lives of the less fortunate.
          </p>
          <br />
          <div className="pic-with-desc paragraph">
            <img className="center" src={groupImg} title="Team behind Drishti at Revhack" alt="team behind Drishti at Revhack" />
            <p>
              Revhack, India&apos;s first Language hackathon hosted by Reverie Language Technologies and NASSCOM, was centered on building a
              system for solving problems in Indian Language Space. Our project <span className="highlight">Drishti</span> helped us place
              first and bagged ₹1 lakh.
            </p>
          </div>
          <AnimateIntoView type="ul" className="profile-wrapper">
            <Profile
              name="Abhinav Chinta"
              role="Founder"
              imgUrl="https://cdn.discordapp.com/attachments/713065974303162381/727939022223179786/IMG_1812.jpg"
              linkedinUrl="https://www.linkedin.com/in/abhinav-chinta-52a207194/"
              githubUrl="https://github.com/abhinav-chinta"
              tabIndex={3}
            />
            <Profile
              name="Anand Balivada"
              role="Braille Engine Developer"
              imgUrl="https://cdn.discordapp.com/attachments/713065974303162381/727938408491778118/IMG_20200701_225710.JPG"
              linkedinUrl="https://www.linkedin.com/in/anand-balivada-a46215194"
              githubUrl="https://github.com/Poincare057"
              tabIndex={5}
            />
            <Profile
              name="Anirudh Sathiya"
              role="Braille Engine Developer"
              imgUrl="https://cdn.discordapp.com/attachments/713065974303162381/727936014085128232/IMG_1809.jpg"
              linkedinUrl="https://www.linkedin.com/in/holaamigos/"
              githubUrl="https://github.com/Anirudh171202"
              tabIndex={7}
            />
            <Profile
              name="Luv Singhal"
              role="UI designer and Developer"
              imgUrl="https://cdn.discordapp.com/attachments/713065974303162381/727936012986351738/IMG_1807.jpg"
              linkedinUrl="https://www.linkedin.com/in/luv-s-28035619b/"
              githubUrl="https://github.com/Lutetium-Vanadium"
              tabIndex={9}
            />
            <Profile
              name="Vrishab Krishna"
              role="Braille Engine Developer"
              imgUrl="https://cdn.discordapp.com/attachments/713065974303162381/727936015179841543/IMG_1808.jpg"
              linkedinUrl="https://www.linkedin.com/in/vrishab/"
              githubUrl="https://github.com/VrishabKrishna"
              tabIndex={11}
            />
          </AnimateIntoView>
          {/* </div> */}
        </AnimateIntoView>
        <AnimateIntoView type="section" className="text-block gradient">
          <h1>Contact Us.</h1>
          <p className="paragraph">
            Want to get into touch with us? Email <span className="email">mail.drishtifoundation@gmail.com</span> or click the link below!
          </p>
          <button className="contact-btn" aria-label="Email us">
            <a href="mailto:mail.drishtifoundation@gmail.com" title="Contact Us" tabIndex={12}>
              Contact Us
            </a>
          </button>
        </AnimateIntoView>
      </main>
    </div>
  );
}

export default About;

const well = (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 172 172">
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <path d="M0,172v-172h172v172z" fill="none"></path>
      <g>
        <path d="M3.44,0c-1.89469,0 -3.44,1.54531 -3.44,3.44v165.12c0,1.90813 1.54531,3.44 3.44,3.44h13.76c1.89469,0 3.44,-1.53187 3.44,-3.44v-137.6h8.6l6.88,-20.64h-15.48v-6.88c0,-1.89469 -1.54531,-3.44 -3.44,-3.44zM116.96,0c-1.90812,0 -3.44,1.54531 -3.44,3.44v6.88h-8.6l-6.88,20.64h15.48v137.6c0,1.90813 1.53188,3.44 3.44,3.44h13.76c1.90813,0 3.44,-1.53187 3.44,-3.44v-165.12c0,-1.89469 -1.53187,-3.44 -3.44,-3.44zM44.3975,6.7725c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-1.22281,0.25531 -2.21719,1.16906 -2.58,2.365l-6.88,20.64c-0.61812,1.20938 -0.47031,2.66063 0.37625,3.72219c0.84656,1.06156 2.23063,1.51844 3.5475,1.1825c1.30344,-0.33594 2.29781,-1.41094 2.52625,-2.75469l6.88,-20.64c0.38969,-1.04812 0.22844,-2.23062 -0.40312,-3.14437c-0.645,-0.92719 -1.69313,-1.47813 -2.82188,-1.47813c-0.1075,0 -0.215,0 -0.3225,0zM54.7175,6.7725c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-1.22281,0.25531 -2.21719,1.16906 -2.58,2.365l-6.88,20.64c-0.61812,1.20938 -0.47031,2.66063 0.37625,3.72219c0.84656,1.06156 2.23063,1.51844 3.5475,1.1825c1.30344,-0.33594 2.29781,-1.41094 2.52625,-2.75469l6.88,-20.64c0.38969,-1.04812 0.22844,-2.23062 -0.40312,-3.14437c-0.645,-0.92719 -1.69313,-1.47813 -2.82188,-1.47813c-0.1075,0 -0.215,0 -0.3225,0zM65.0375,6.7725c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-1.22281,0.25531 -2.21719,1.16906 -2.58,2.365l-6.88,20.64c-0.61812,1.20938 -0.47031,2.66063 0.37625,3.72219c0.84656,1.06156 2.23063,1.51844 3.5475,1.1825c1.30344,-0.33594 2.29781,-1.41094 2.52625,-2.75469l6.88,-20.64c0.38969,-1.04812 0.22844,-2.23062 -0.40312,-3.14437c-0.645,-0.92719 -1.69313,-1.47813 -2.82188,-1.47813c-0.1075,0 -0.215,0 -0.3225,0zM75.3575,6.7725c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-1.22281,0.25531 -2.21719,1.16906 -2.58,2.365l-6.88,20.64c-0.13437,0.34938 -0.20156,0.71219 -0.215,1.075v17.3075c-12.48344,0.72563 -22.8975,9.29875 -26.3375,20.855c0.37625,-0.04031 0.79281,-0.215 1.1825,-0.215h6.235c3.41313,-8.07594 11.48906,-13.8675 20.64,-13.8675c9.15094,0 17.22688,5.79156 20.64,13.8675h5.9125c0.49719,0 1.02125,0.14781 1.505,0.215c-3.10406,-10.48125 -11.98625,-18.46312 -22.8975,-20.425v-17.3075l6.665,-19.995c0.38969,-1.04812 0.22844,-2.23062 -0.40312,-3.14437c-0.645,-0.92719 -1.69313,-1.47813 -2.82188,-1.47813c-0.1075,0 -0.215,0 -0.3225,0zM85.6775,6.7725c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-1.22281,0.25531 -2.21719,1.16906 -2.58,2.365l-6.88,20.64c-0.61812,1.20938 -0.47031,2.66063 0.37625,3.72219c0.84656,1.06156 2.23063,1.51844 3.5475,1.1825c1.30344,-0.33594 2.29781,-1.41094 2.52625,-2.75469l6.88,-20.64c0.38969,-1.04812 0.22844,-2.23062 -0.40312,-3.14437c-0.645,-0.92719 -1.69313,-1.47813 -2.82188,-1.47813c-0.1075,0 -0.215,0 -0.3225,0zM95.9975,6.7725c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-1.22281,0.25531 -2.21719,1.16906 -2.58,2.365l-6.88,20.64c-0.61812,1.20938 -0.47031,2.66063 0.37625,3.72219c0.84656,1.06156 2.23063,1.51844 3.5475,1.1825c1.30344,-0.33594 2.29781,-1.41094 2.52625,-2.75469l6.88,-20.64c0.38969,-1.04812 0.22844,-2.23062 -0.40312,-3.14437c-0.645,-0.92719 -1.69313,-1.47813 -2.82188,-1.47813c-0.1075,0 -0.215,0 -0.3225,0zM137.6,17.2v6.88h6.88v34.4c0,1.89469 1.54531,3.44 3.44,3.44h11.2875c1.19594,2.05594 3.37281,3.44 5.9125,3.44c3.80281,0 6.88,-3.07719 6.88,-6.88c0,-3.80281 -3.07719,-6.88 -6.88,-6.88c-2.53969,0 -4.71656,1.38406 -5.9125,3.44h-7.8475v-34.4c0,-1.89469 -1.54531,-3.44 -3.44,-3.44zM40.205,75.7875c-1.03469,0 -2.02906,0.48375 -2.6875,1.29c-0.65844,0.80625 -0.86,1.88125 -0.645,2.9025l8.6,41.065c0.33594,1.59906 1.70656,2.795 3.3325,2.795h36.55c1.62594,0 3.01,-1.19594 3.3325,-2.795l8.385,-41.065c0.215,-1.02125 -0.09406,-2.09625 -0.7525,-2.9025c-0.645,-0.80625 -1.65281,-1.29 -2.6875,-1.29zM27.52,130.72v37.84c0,1.20938 -0.25531,2.365 -0.645,3.44h80.41c-0.38969,-1.075 -0.645,-2.23062 -0.645,-3.44v-37.84z"></path>
      </g>
    </g>
  </svg>
);

const blind = (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 172 172">
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <path d="M0,172v-172h172v172z" fill="none"></path>
      <g>
        <path d="M9.78698,1.67969l-8.10729,8.10729l160.53333,160.53333l8.10729,-8.10729l-34.54557,-34.54558c23.48267,-15.8999 35.0738,-38.13207 35.22864,-38.43125c0.65045,-0.95379 0.99781,-2.08173 0.99661,-3.2362c-0.00087,-1.29319 -0.43891,-2.54811 -1.24297,-3.56094c-0.59736,-0.96163 -33.62546,-53.77239 -84.75703,-53.77239c-14.50615,0 -27.52384,4.3011 -38.78958,10.43646zM86,45.86667c22.16507,0 40.13333,17.96827 40.13333,40.13333c0,9.01255 -3.03842,17.27366 -8.0625,23.96354l-16.58411,-16.58412c1.08064,-2.23193 1.71328,-4.72577 1.71328,-7.37942c0,-9.50013 -7.69987,-17.2 -17.2,-17.2c-2.65365,0 -5.1475,0.63264 -7.37942,1.71328l-16.58412,-16.58411c6.68988,-5.02408 14.951,-8.0625 23.96354,-8.0625zM28.38672,52.03672c-17.03954,14.33306 -26.81016,29.87559 -27.13255,30.39114c-0.81047,1.01435 -1.25264,2.27376 -1.25417,3.57214c0.00102,1.1094 0.32388,2.19467 0.92943,3.12422c0.00743,0.01122 0.01489,0.02242 0.0224,0.03359c0.09858,0.20342 27.82281,54.17552 85.04818,54.17552c10.60667,0 20.18438,-1.87203 28.77864,-4.89349l-14.83724,-14.84843c-4.3516,1.6168 -9.03368,2.54192 -13.94141,2.54192c-22.16507,0 -40.13333,-17.96827 -40.13333,-40.13333c0,-4.90773 0.92513,-9.58981 2.54193,-13.94141z"></path>
      </g>
    </g>
  </svg>
);

const knowledge = (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="120" height="120" viewBox="0 0 172 172">
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <path d="M0,172v-172h172v172z" fill="none"></path>
      <g>
        <path d="M68.8,17.2c-3.1663,0.00032 -5.73302,2.56703 -5.73333,5.73333v45.86667c0.00032,3.1663 2.56703,5.73302 5.73333,5.73333c21.02222,0 36.95313,10.50364 36.95312,10.50364c0.00373,0.00374 0.00746,0.00747 0.0112,0.0112c0.10965,0.071 0.22169,0.13822 0.33593,0.20157c0.07013,0.03881 0.14107,0.07614 0.21276,0.11198c0.02977,0.01145 0.05963,0.02264 0.08958,0.03359c0.14983,0.07764 0.30302,0.14863 0.45911,0.21276c0.1761,0.06854 0.35549,0.12834 0.5375,0.17917c0.0298,0.00771 0.05966,0.01517 0.08958,0.02239c0.12215,0.03394 0.2454,0.06382 0.36953,0.08958c0.00746,0.00001 0.01493,0.00001 0.02239,0c0.17043,0.03392 0.3423,0.06008 0.51511,0.07839c0.01493,0.00006 0.02986,0.00006 0.04479,0c0.15268,0.0136 0.30584,0.02107 0.45912,0.02239c0.06718,0.00118 0.13438,0.00118 0.20156,0c0.10096,-0.0048 0.20178,-0.01227 0.30234,-0.02239c0.05604,-0.00291 0.11204,-0.00664 0.16797,-0.0112c0.03363,-0.00344 0.06722,-0.00717 0.10078,-0.0112c0.15795,-0.0233 0.31486,-0.05319 0.47032,-0.08959c0.15091,-0.03499 0.30033,-0.07608 0.44791,-0.12317c0.03366,-0.00716 0.06726,-0.01463 0.10079,-0.02239c0.0337,-0.01089 0.06729,-0.02209 0.10078,-0.0336c0.04877,-0.018 0.0973,-0.03666 0.14557,-0.05599c0.12875,-0.04768 0.25574,-0.09997 0.38073,-0.15677c0.14472,-0.065 0.28668,-0.13598 0.42552,-0.21276c0.12595,-0.06998 0.24922,-0.14469 0.36954,-0.22396c0,0 15.9309,-10.50364 36.95312,-10.50364c3.1663,-0.00032 5.73302,-2.56703 5.73333,-5.73333v-45.86667c-0.00032,-3.1663 -2.56703,-5.73302 -5.73333,-5.73333c-18.80593,0 -33.8783,7.08648 -40.13333,10.54844c-6.25503,-3.46196 -21.3274,-10.54844 -40.13333,-10.54844zM74.53333,29.31615c15.57152,1.44974 25.78875,6.8486 28.66667,8.5888v33.10104c-6.53704,-3.18731 -15.4962,-6.237 -28.66667,-7.28985zM143.33333,29.31615v34.4c-13.17046,1.05285 -22.12962,4.10254 -28.66667,7.28985v-33.10104c2.87792,-1.7402 13.09515,-7.13906 28.66667,-8.5888zM45.86667,86c-2.19482,0.00186 -4.369,0.42377 -6.40521,1.24297l-27.99479,10.2237v45.86667l24.1987,-10.51484c2.8552,-1.2384 6.08567,-1.28185 8.96953,-0.10078l51.96953,21.23124c0,0 0.02227,0.00001 0.0224,0c1.15651,0.55672 2.42298,0.84751 3.70651,0.85104c1.48492,-0.00524 2.94318,-0.39489 4.23281,-1.13099c0.00076,-0.00025 0.03312,0.00024 0.0336,0l51.52161,-28.62187l-0.0112,-0.0112c2.72535,-1.51422 4.41774,-4.38486 4.42317,-7.50261c0,-4.74965 -3.85035,-8.6 -8.6,-8.6c-1.26292,0.00482 -2.50929,0.28774 -3.65052,0.82864v-0.0112l-39.34948,16.38255h-8.6c4.74965,0 8.6,-3.85035 8.6,-8.6c-0.00093,-3.72202 -2.3961,-7.02104 -5.93489,-8.17448v-0.0112l-49.84193,-21.73516h-0.06719c-2.26203,-1.0552 -4.72662,-1.60544 -7.22266,-1.6125z"></path>
      </g>
    </g>
  </svg>
);
