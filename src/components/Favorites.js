import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = ({ favorites, setFavorites, removeFavorite, clearFavorites, handleDrop }) => {
  // Prevent the default behavior for drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="favorites"
      onDragOver={handleDragOver} // Enable drag over functionality
      onDrop={(e) => handleDrop(e, favorites)} // Handle dropping a dragged item
    >
      <h2>Favorites</h2>

      {/* Render favorite items if the list is not empty */}
      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <div className="favorite-item" key={fav.id} draggable>
            <h3>{fav.type}</h3>
            <p>Price: £{fav.price}</p>
            <p>Location: {fav.location}</p>
            <Link to={`/property/${fav.id}`}>View Details</Link> {/* Link to detailed property page */}
            <button onClick={() => removeFavorite(fav.id)}>Remove</button> {/* Button to remove from favorites */}
          </div>
        ))
      ) : (
        <p>No favorites yet.</p> // Display message if no favorites are added
      )}
      <button onClick={clearFavorites}>Clear Favorites</button> {/* Button to clear all favorites */}
    </div>
  );
};

export default Favorites;
