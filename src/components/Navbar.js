// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const { currentUser, logout } = useAuth(); // Get current user and logout function from AuthContext

  useEffect(() => {
    setCartCount(cart.reduce((count, item) => count + item.quantity, 0));
  }, [cart]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="https://cdnb.artstation.com/p/assets/images/images/045/035/031/large/joshua-white-barn.jpg?1641774675" alt="The Brick Barn Logo" className="brand-logo" />
          The Brick Barn
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart />{cartCount > 0 && <span className="cart-count">({cartCount})</span>}
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {currentUser.email}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>Sign Out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
