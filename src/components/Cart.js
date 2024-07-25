import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Cart = () => {
  const { cart, removeItem, updateItemQuantity, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const taxRate = 0.0825; // 8.25% tax rate

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscountAmount = (subtotal) => {
    return subtotal * (discount / 100);
  };

  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount(subtotal);
    const taxAmount = calculateTax(subtotal - discountAmount);
    return subtotal - discountAmount + taxAmount;
  };

  const handleApplyDiscount = async () => {
    setError('');
    try {
      const q = query(collection(db, "discountCodes"), where("code", "==", discountCode));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError('Invalid discount code');
        setDiscount(0); // Reset discount if code is invalid
      } else {
        const discountData = querySnapshot.docs[0].data();
        setDiscount(discountData.amount);
      }
    } catch (err) {
      setError('Failed to apply discount');
      console.error(err);
    }
  };

  const handleCheckout = () => {
    setIsCheckout(true);
    clearCart();
  };

  return (
    <div className="container"> {/* Add this line */}
      <div className="cart-container">
        <h1>Your Cart</h1>
        {isCheckout ? (
          <div>
            <h2>Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>
          </div>
        ) : (
          <div>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageURL} alt={`${item.color} ${item.dimension}`} />
                  <div className="cart-item-details">
                    <h3>{`${item.color} ${item.dimension}`}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <label>Quantity: </label>
                      <button 
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
            {cart.length > 0 && (
              <div className="total-section">
                <h2>Subtotal: ${calculateSubtotal().toFixed(2)}</h2>
                <div className="discount-section">
                  <label>Discount Code:</label>
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button onClick={handleApplyDiscount}>Apply</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <p>Discount: -${calculateDiscountAmount(calculateSubtotal()).toFixed(2)}</p>
                <p>Tax: +${calculateTax(calculateSubtotal() - calculateDiscountAmount(calculateSubtotal())).toFixed(2)}</p>
                <h2>Total: ${calculateTotal().toFixed(2)}</h2>
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
