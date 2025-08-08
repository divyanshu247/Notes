
import React from "react";
import "../components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>EduHub</h3>
        <p>Your companion for notes, PYQs & motivation 📚</p>
      </div>

      <div className="footer-links">
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li><br/>
            <li><a href="/notes">Notes</a></li><br/>
            <li><a href="/pyq">PYQs</a></li><br/>
            <li><a href="/upload">Upload</a></li><br/>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: eduhub@gmail.com</p>
          <p>LinkedIn:Divyanshu Gaurav</p>
        </div>
        <div>
          <h4>Motivation</h4>
          <p>"Knowledge is power, but enthusiasm pulls the switch."</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EduHub. Built with React + Vite ⚡</p>
        <p>All materials are for educational use only.</p>
        <p>ALL rights reserved by Divyanshu and Team</p>
      </div>
    </footer>
  );
};

export default Footer;
