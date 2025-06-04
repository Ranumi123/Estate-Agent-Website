import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  // State to hold the search criteria entered by the user
  const [criteria, setCriteria] = useState({
    type: '', // Type of property (House or Flat)
    minPrice: '', // Minimum price of property
    maxPrice: '', // Maximum price of property
    minBedrooms: '', // Minimum number of bedrooms
    maxBedrooms: '', // Maximum number of bedrooms
    postcode: '', // Postcode for property location
    date: '', // Date field (single date)
  });

  // Handle input field changes
  const handleChange = (e) => {
    // Update the criteria state with the new value for the specific field
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(criteria); // Call the onSearch function with the current criteria
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Dropdown for selecting property type */}
      <label>
        Type:
        <select name="type" value={criteria.type} onChange={handleChange}>
          <option value="">Any</option> {/* Default option */}
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </label>

      {/* Input for minimum price */}
      <label>
        Min Price:
        <input
          type="number"
          name="minPrice"
          value={criteria.minPrice}
          onChange={handleChange}
          placeholder="e.g., 50000"
          min="0" // Prevents negative values
        />
      </label>

      {/* Input for maximum price */}
      <label>
        Max Price:
        <input
          type="number"
          name="maxPrice"
          value={criteria.maxPrice}
          onChange={handleChange}
          placeholder="e.g., 1000000"
          min="0" // Prevents negative values
        />
      </label>

      {/* Input for minimum number of bedrooms */}
      <label>
        Min Bedrooms:
        <input
          type="number"
          name="minBedrooms"
          value={criteria.minBedrooms}
          onChange={handleChange}
          placeholder="e.g., 2"
          min="0" // Prevents negative values
        />
      </label>

      {/* Input for maximum number of bedrooms */}
      <label>
        Max Bedrooms:
        <input
          type="number"
          name="maxBedrooms"
          value={criteria.maxBedrooms}
          onChange={handleChange}
          placeholder="e.g., 5"
          min="0" // Prevents negative values
        />
      </label>

      {/* Input for postcode */}
      <label>
        Postcode:
        <input
          type="text"
          name="postcode"
          value={criteria.postcode}
          onChange={handleChange}
          placeholder="e.g., HA1"
        />
      </label>

      {/* Input for the date */}
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={criteria.date}
          onChange={handleChange}
        />
      </label>

      {/* Submit button to trigger the search */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
