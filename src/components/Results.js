import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './Results.css'; // Import the CSS file for styling

const Results = ({ properties, addToFavorites, handleDragStart }) => {
  return (
    <div className="results">
      {/* Loop through the properties array and render a property card for each one */}
      {properties.map((property) => (
        <div
          className="property-card"
          key={property.id} // Unique key for each property card
          draggable // Allow the property card to be dragged
          onDragStart={(e) => handleDragStart(e, property)} // Trigger handleDragStart when dragging starts
        >
          {/* Image of the property */}
          <img src={property.picture} alt={property.type} />
          <h3>{property.type}</h3>
          <p>{property.description}</p>
          <p>Price: £{property.price}</p>
          <Link to={`/property/${property.id}`}>View Details</Link>
          {/* Button to add the property to the favorites list */}
          <button onClick={() => addToFavorites(property)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
};

export default Results;
