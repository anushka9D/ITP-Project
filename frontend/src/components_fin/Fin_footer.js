import React from "react";
import './Fin_footer.css';  // Updated CSS file with FIN prefixes

const Footer = () => {
  return (
    <footer className="FIN-footer-wrapper">
      <div className="FIN-footer-section-one">
        <div className="FIN-footer-logo-container">
          <h1 className="FIN-logo-container">AMS</h1>
          <p className="FIN-footer-logo-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius ut nisl nec dignissim. Lorem 
            ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius ut nisl nec dignissim.    
          </p>
        </div>        
      </div>

      <div className="FIN-footer-section-two">
        <div className="FIN-footer-section-columns">
          <span>Quality</span>
          <span>Help</span>
          <span>Share</span>
          <span>Careers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>

        <div className="FIN-footer-section-columns">
          <span>244-5333-7783</span>
          <span>hello@food.com</span>
          <span>press@food.com</span>
          <span>contact@food.com</span>
        </div>

        <div className="FIN-footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;