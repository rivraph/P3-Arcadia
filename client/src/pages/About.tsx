import type React from "react";
import "../styles/About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <h2>Welcome to Arcadia</h2>
        <img
          src="JS-RemoteFR-Vendangeurs-P3-Arcadia\client\public\assets\Bienvenue Arcadia.png"
          alt="Bienvenue Arcadia"
          className="welcome-image"
        />
        <p>
          At Arcadia, we are passionate about interactive entertainment and
          immersive experiences. Since our founding in [year], our mission has
          been to reinvent the joy of arcade gaming by combining cutting-edge
          technology, creativity, and nostalgia to create unforgettable moments
          for all our visitors.
        </p>
        <h2>Our Vision</h2>
        <p>
          To become a global leader in the arcade gaming industry by creating
          spaces where generations can come together, have fun, and share
          memories.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Innovation:</strong> We push the boundaries of possibility
            by integrating the latest technologies to deliver unique gaming
            experiences.
          </li>
          <li>
            <strong>Community:</strong> Our spaces are designed to bring people
            together, foster connections, and build relationships.
          </li>
          <li>
            <strong>Accessibility:</strong> Whether you’re a passionate gamer or
            a casual player, our games are made for everyone.
          </li>
          <li>
            <strong>Sustainability:</strong> We are committed to reducing our
            environmental impact by using eco-friendly materials and sustainable
            practices.
          </li>
        </ul>
        <h2>What We Offer</h2>
        <p>
          A wide variety of games: From timeless classics like Pac-Man and Space
          Invaders to the latest innovations in virtual and augmented reality.
        </p>
        <p>
          Exclusive events: Gaming competitions, themed nights, and exciting new
          game releases.
        </p>
        <p>
          Modular spaces: Perfect for family outings, get-togethers with
          friends, or corporate events.
        </p>
        <p>
          Rules and conditions: We provide clear information about the rules of
          each game and the conditions for using our facilities.
        </p>
        <p>
          Discover new arrivals: Stay updated on the latest machines and games
          added to our collection.
        </p>
        <h2>Our Pricing</h2>
        <p>We offer pricing options to suit every budget:</p>
        <ul>
          <li>Individual games: Starting at [price].</li>
          <li>Day passes: [price].</li>
          <li>Monthly memberships: [price].</li>
        </ul>
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
        <h2>Our Team</h2>
        <p>
          Arcadia is above all a team of gaming enthusiasts and experience
          creators. Each of our team members brings their expertise to ensure
          quality services and games that meet everyone’s expectations.
        </p>
        <h2>Join the Adventure!</h2>
        <p>
          Want to rediscover the world of arcade games or dive into incredible
          virtual worlds? Visit one of our arcades or explore our online
          offerings to start your journey.
        </p>
        <p>
          To learn more about our activities or collaborate with us, contact us
          at: contact@arcadia.fr.
        </p>
      </div>
    </div>
  );
};

export default About;
