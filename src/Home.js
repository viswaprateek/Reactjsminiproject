
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Search({ searchTerm, onSearchChange, onSearchSubmit }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products"
        className="search-input title-font paragraph-font text-color background-color"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button
        className="search-button title-font paragraph-font"
        onClick={onSearchSubmit}
      >
        Search
      </button>
    </div>
  );
}

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className={`product-card-container  rounded-md shadow-md overflow-hidden transition duration-300 transform relative ${
        isHovered ? 'hover:shadow-lg hover:scale-105' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={product.image}
        alt={product.title}
        className="product-card-image w-full h-48 object-cover rounded-t-md transition duration-300"
        style={{ filter: isHovered ? 'brightness(90%)' : 'none', objectPosition: 'center', height: '250px' }}
      />
      <div className="product-card-details">
        <div className="p-4">
          <h3 className="product-card-title text-xl font-semibold mb-2">{product.title}</h3>
          <div className="mt-4">
            <button className="product-card-button px-4 py-2 rounded-md hover:transition duration-300" onClick={handleViewDetails}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-custom-bg min-h-screen">
      <div className="red-ribbon">
  <span className="ribbon-content">Online Store</span>
</div>
<br/><br/>
      <div className="container mx-auto py-8">
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onViewDetails={() => handleViewDetails(product.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;



