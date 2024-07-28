// src/components/Checkout.js
import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure the path is correct

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = subtotal * (discount / 100);
    return subtotal - discountAmount;
  };

  const handleApplyDiscount = async () => {
    setError('');
    try {
      const q = query(collection(db, "discountCodes"), where("code", "==", discountCode));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError('Invalid discount code');
      } else {
        const discountData = querySnapshot.docs[0].data();
        setDiscount(discountData.amount);
      }
    } catch (err) {
      setError('Failed to apply discount');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment successful! Thank you for your purchase.');
    clearCart(); // Clear the cart after payment
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Your Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
        <div>
          <h4>Subtotal: ${calculateSubtotal().toFixed(2)}</h4>
          <h4>Discount: {discount}%</h4>
          <h4>Total: ${calculateTotal().toFixed(2)}</h4>
        </div>
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
      </div>
      <div className="payment-form">
        <h3>Payment Information</h3>
        <form onSubmit={handlePayment}>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
