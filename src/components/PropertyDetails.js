import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './PropertyDetails.css';

const PropertyDetails = ({ addToFavorites }) => {
  // Retrieve property ID from URL parameters
  const { id } = useParams();

  // Find the property that matches the ID from propertiesData
  const property = propertiesData?.properties?.find((p) => p.id === id);

  // State for managing the main image displayed
  const [mainImage, setMainImage] = useState(property?.pictures[0]);

  // If no property is found, display an error message
  if (!property) {
    console.error(`Property with ID "${id}" not found.`);
    return <p>Property not found.</p>;
  }

  // Handle click on thumbnail image to change the main displayed image
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="property-details">
      <h2>{property.type}</h2>
      <p>{property.description}</p>
      <p><strong>Price: </strong>£{property.price}</p>
      <p><strong>Location: </strong>{property.location}</p>
      <p><strong>Tenure: </strong>{property.tenure}</p>
      <p><strong>Added on: </strong>{`${property.added.month} ${property.added.day}, ${property.added.year}`}</p>

      {/* Image Gallery */}
      <div className="image-gallery">
        {/* Large image */}
        <div className="main-image">
          <img src={mainImage} alt="Main property" />
        </div>

        {/* Thumbnail images */}
        <div className="thumbnail-images">
          {property.pictures.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => handleThumbnailClick(image)} // Change main image on click
            />
          ))}
        </div>
      </div>

      {/* Add to Favorites Button */}
      <button onClick={() => addToFavorites(property)} className="add-to-fav-btn">
        Add to Favorites
      </button>

      {/* Tabs for more details */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.longDescription}</p>
        </TabPanel>
        <TabPanel>
          <img src={property.floorPlan} alt="Floor plan" />
        </TabPanel>
        <TabPanel>
          <a href={property.mapUrl} target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
