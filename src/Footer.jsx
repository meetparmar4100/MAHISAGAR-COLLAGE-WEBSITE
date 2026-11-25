import React from "react";
import collegeLogo from "./medical-college-logo.png";
import admissionQr from "./admission-contact-qr.png";

const phone = "tel:+918000466422";
const directions = "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Cottage Hospital, Moti Charel, Lunawada, Gujarat 389230");

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <a className="footer-logo" href="/">
            <img src={collegeLogo} width="1254" height="1254" alt="Swaminarayan Medical College, Mahisagar" loading="lazy" />
          </a>
          <strong>Swaminarayan Medical College, Mahisagar</strong>
          <address className="footer-address">
            <a href={phone}>+91 80004 66422</a>
            <div>
              Charel Road, behind Cottage Hospital, Moti Charel, Lunawada, Gujarat 389230
              <br />
              Near Cottage Chowkdi / Godhra Road
            </div>
          </address>
        </div>
        <nav aria-labelledby="footer-quick-heading">
          <h2 id="footer-quick-heading">Quick Links</h2>
          <ul>
            <li><a href="/#mbbs-heading">About MBBS</a></li>
            <li><a href="/#mbbs-eligibility">MBBS Eligibility</a></li>
            <li><a href="/#mbbs-benefits">Benefits &amp; Advantages</a></li>
            <li><a href="/#teaching-methodology">Teaching Methodology</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-campus-heading">
          <h2 id="footer-campus-heading">Our Campus</h2>
          <ul>
            <li><a href={directions}>Directions to Cottage Hospital</a></li>
          </ul>
        </nav>
        <div className="footer-enquiry">
          <h2>Admission Enquiry</h2>
          <p>Scan the QR code or tap to call.</p>
          <a className="footer-qr" href={phone} aria-label="Call admission enquiry at +91 80004 66422">
            <img src={admissionQr} alt="" width="116" height="116" loading="lazy" />
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Swaminarayan Medical College, Mahisagar</span>
        <a href="#home">Back to top</a>
      </div>
    </footer>
  );
}
