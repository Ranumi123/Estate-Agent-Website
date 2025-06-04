// Footer.js
import React from 'react'; // Importing React library for component creation
import './Footer.css'; // Importing the CSS file for styling the footer

// Footer component
const Footer = () => {
  return (
    <footer className="footer"> {/* Footer section of the page */}
      <p>&copy; {new Date().getFullYear()} Your Real Estate App. All rights reserved.</p> 
      {/* Displaying the current year dynamically using JavaScript's Date object */}
    </footer>
  );
};

export default Footer; // Exporting the Footer component to be used in other parts of the application
