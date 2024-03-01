

// Product.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './product.css';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        const productData = response.data;
        const { rate, count } = productData.rating;
        productData.rating = { rate, count };
        setProduct(productData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-container bg-custom-bg min-h-screen flex justify-center items-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="ribbon-container">
          <div className="red-ribbon">
            <span className="ribbon-content">Online Store</span>
          </div>
          <div className="individual-product-card-container">
            <div className="individual-product-card max-w-3xl bg-gray-100 rounded-lg overflow-hidden shadow-md flex transition duration-300 hover:shadow-lg">
              <div className="individual-product-image-container w-1/2 bg-gray-200 p-4 flex justify-center items-center" style={{ borderRadius: '10px' }}>
                <div className="individual-product-image-wrapper" style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="individual-product-image w-full h-full object-cover rounded-md transition duration-300 transform hover:scale-105"
                    style={{ borderRadius: '10px' }}
                  />
                </div>
              </div>
              <div className="individual-product-content-container w-1/2 p-6 rounded-r-lg" style={{ backgroundColor: '#F3F4F6' }}>
                <h2 className="individual-product-title text-2xl font-bold mb-2">{product.title}</h2>
                <p className="individual-product-price text-gray-800 text-lg mb-2">Price: ${product.price}</p>
                <p className="individual-product-description text-gray-600 mb-4">{product.description}</p>
                <div className="individual-product-rating-container flex items-center mb-4">
                  <p className="individual-product-rating-label text-gray-800 mr-2">Rating:</p>
                  <div className="individual-product-rating-stars flex items-center">
                    {[...Array(Math.round(product.rating.rate))].map((_, index) => (
                      <svg key={index} xmlns="http://www.w3.org/2000/svg" className="individual-product-rating-star-icon h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 1a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 13.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.192-3.047-2.97a.75.75 0 0 1 .416-1.28l4.21-.612 1.883-3.815A.75.75 0 0 1 10 1zM5.902 4.27l-1.343 2.715a.75.75 0 0 1-.427.427L1.39 8.825l2.712.394a.75.75 0 0 1 .546.41l1.21 2.351-1.654-.87a.75.75 0 0 1-.363-.246L5 10.46V5.477a.75.75 0 0 1 .902-.74zM10 15.235a.75.75 0 0 1 .44.139l3.65 2.057-1.412-4.338a.75.75 0 0 1 .225-.728l2.954-2.88-3.865-.563a.75.75 0 0 1-.566-.41L10 4.265l-1.882 3.815a.75.75 0 0 1-.566.41l-3.865.563 2.954 2.88a.75.75 0 0 1 .225.728l-1.412 4.338 3.65-2.057a.75.75 0 0 1 .44-.14z" clipRule="evenodd" />
                      </svg>
                    ))}
                    <span className="individual-product-rating-value text-gray-800 ml-2">{product.rating.rate} ({product.rating.count})</span>
                  </div>
                </div>
                <button className="individual-product-button bg-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300" onClick={handleGoBack}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
