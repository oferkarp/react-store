import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    // Fetch cart item details from the API and update state
    const fetchCartItem = async () => {
      try {
        const response = await fetch('https://django-rest-framework-store.onrender.com/cart_items/1');
        if (response.ok) {
          const responseData = await response.json();
          setCartItem(responseData); // Set the cart item details
        } else {
          console.error('Failed to fetch cart item');
        }
      } catch (error) {
        console.error('Error fetching cart item:', error);
      }
    };

    fetchCartItem();
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {cartItem ? (
        <div>
          <p>ID: {cartItem.id}</p>
          <p>Quantity: {cartItem.quantity}</p>
          <p>Product ID: {cartItem.product}</p>
          <p>Cart ID: {cartItem.cart}</p>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
