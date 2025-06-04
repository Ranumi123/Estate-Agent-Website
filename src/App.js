import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import propertiesData from './data/properties.json';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import PropertyDetails from './components/PropertyDetails';
import Favorites from './components/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = (criteria) => {
    const filtered = propertiesData.properties.filter((property) => {
      return (
        (!criteria.type || property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= criteria.minPrice) &&
        (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
        (!criteria.minBedrooms || property.bedrooms >= criteria.minBedrooms) &&
        (!criteria.maxBedrooms || property.bedrooms <= criteria.maxBedrooms) &&
        (!criteria.postcode || property.location.includes(criteria.postcode))
      );
    });
    setFilteredProperties(filtered);
  };

  const addToFavorites = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      const updatedFavorites = [...favorites, property];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData('propertyId', property.id);
  };

  const handleDrop = (e) => {
    const propertyId = e.dataTransfer.getData('propertyId');
    const property = propertiesData.properties.find((prop) => prop.id === propertyId);
    if (property && !favorites.find((fav) => fav.id === property.id)) {
      addToFavorites(property);
    }
  };

  const toggleFavorites = () => {
    setFavoritesOpen(!isFavoritesOpen);
  };

  return (
    <Router>
      <div className="App">
        <Header toggleFavorites={toggleFavorites} />
        <main>
          {isFavoritesOpen && (
            <div className="favorites-popup">
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                removeFavorite={removeFavorite}
                clearFavorites={clearFavorites}
                handleDrop={handleDrop}
              />
              <button className="close-popup-btn" onClick={toggleFavorites}>
                X
              </button>
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchForm onSearch={handleSearch} />
                  <Results
                    properties={filteredProperties}
                    addToFavorites={addToFavorites}
                    handleDragStart={handleDragStart}
                  />
                </>
              }
            />
            <Route
              path="/property/:id"
              element={<PropertyDetails addToFavorites={addToFavorites} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
