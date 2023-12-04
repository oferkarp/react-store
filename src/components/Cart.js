import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../App.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useParams();
  // const userId = 1; // Replace this with the actual user ID

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`https://django-rest-framework-store.onrender.com/user_cart_items/${userId}`);
        if (response.ok) {
          const responseData = await response.json();
          setCartItems(responseData); // Set the cart items
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const [productData, setProductData] = useState({});

  useEffect(() => {
    const fetchProduct = async (productId) => {
      try {
        const response = await fetch(`https://django-rest-framework-store.onrender.com/products/${productId}`);
        if (response.ok) {
          const product = await response.json();
          setProductData((prevData) => ({ ...prevData, [productId]: product }));
        } else {
          console.error(`Failed to fetch product details for product ID: ${productId}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    cartItems.forEach((cartItem) => {
      if (!productData[cartItem.product]) {
        fetchProduct(cartItem.product);
      }
    });
  }, [cartItems, productData]);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((cartItem) => {
            const product = productData[cartItem.product];
            return (
              <div className="cart-item" key={cartItem.id}>
                {product && (
                  <>
                    <img src={`https://django-rest-framework-store.onrender.com${product.image}`} alt={product.name} className="product-image" />
                    <div className="item-details">
                      <p><strong>Name:</strong> {product.name}</p>
                      <p><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
                      <p><strong>Quantity:</strong> {cartItem.quantity}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
