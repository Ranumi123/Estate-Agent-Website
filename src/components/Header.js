import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link component for routing
import './Header.css'; // Importing the CSS file for styling

// Header component that takes 'toggleFavorites' function as a prop
const Header = ({ toggleFavorites }) => {
  return (
    <header className="header"> {/* Header element that contains the whole header section */}
      <div className="header-container"> {/* Container to center and structure the header content */}
        
        {/* Branding section on the left */}
        <div className="brand">
          <h1 className="brand-name">DreamHaven</h1> {/* Display the brand name */}
        </div>
        
        {/* Navigation section on the right */}
        <nav className="navbar">
          <ul className="navlinks"> {/* Unordered list for the navigation links */}
            <li>
              <Link to="/" className="icon-link"> {/* Link to the homepage */}
                <i className="fas fa-home"></i> {/* Home icon */}
              </Link>
            </li>
            <li>
              {/* Button for toggling favorites, invokes the 'toggleFavorites' function on click */}
              <button onClick={toggleFavorites} className="favorites-icon-btn">
                <i className="fas fa-heart"></i> {/* Heart icon for favorites */}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; // Exporting the Header component for use in other parts of the application
