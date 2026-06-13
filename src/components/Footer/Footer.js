import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          GoalFlow &copy; {year} — Built with React.js for personal goal tracking
        </p>
        <p className="footer-note">Data saved locally in your browser</p>
      </div>
    </footer>
  );
}

export default Footer;
