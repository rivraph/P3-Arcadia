import type React from "react";
import "../styles/About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div>
          <h2>
            Welcome to Arcadia Playstore, a unique concept combining the
            pleasure of retro gaming online and in-store!
          </h2>
          <img src="../assets/playstore.webp" alt="magasin" />
        </div>

        <div>
          <h2>Our Concept</h2>
          <p>
            Our platform lets you play arcade games online and collect points.
            These points can then be exchanged for free games in our physical
            store, where you'll find an exceptional selection of vintage and
            modern arcade machines.
          </p>
        </div>

        <div>
          <h2>What We Offer</h2>
          <p>
            Arcadia Playstore was born out of a passion for the world of retro
            gaming.For several years, our physical store has been a must for
            fans of pinball machines, arcade games and retro consoles. With this
            site, we aim to expand our community by offering a new way to play,
            blending the digital with the real experience.
          </p>
          <p>
            Exclusive events: Gaming competitions, themed nights, and exciting
            new game releases.
          </p>
          <p>
            Modular spaces: Perfect for family outings, get-togethers with
            friends, or corporate events.
          </p>
          <p>
            Rules and conditions: We provide clear information about the rules
            of each game and the conditions for using our facilities.
          </p>
          <p>
            Discover new arrivals: Stay updated on the latest machines and games
            added to our collection.
          </p>
        </div>

        <div>
          <h2>Arcadia PlayStore</h2>
          <p>We offer pricing options to suit every budget:</p>
          <ul>
            <li>Individual games: Starting at 2€.</li>
            <li>Day passes: 50€.</li>
            <li>Monthly memberships: 160€.</li>
          </ul>
        </div>

        <div>
          <h2>Address and Contact Information</h2>
          <p>
            Our arcade is located at:
            <br />
            123 Rue des Pixels, 75000 Paris, France
            <br />
            Phone: +33 1 23 45 67 89
            <br />
            Email: contact@arcadia.fr
          </p>
        </div>

        <div>
          <h2>Our Team</h2>
          <p>
            Arcadia is above all a team of gaming enthusiasts and experience
            creators. Each of our team members brings their expertise to ensure
            quality services and games that meet everyone’s expectations.
          </p>
        </div>

        <div>
          <h2>Join the Adventure!</h2>
          <p>
            Want to rediscover the world of arcade games or dive into incredible
            virtual worlds? Visit one of our arcades or explore our online
            offerings to start your journey.
          </p>
          <p>
            To learn more about our activities or collaborate with us, contact
            us at: contact@arcadia.fr.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
