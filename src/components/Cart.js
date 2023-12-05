import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../App.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [productData, setProductData] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`https://django-rest-framework-store.onrender.com/user_cart_items/${userId}`);
        if (response.ok) {
          const responseData = await response.json();
          const consolidatedCart = [];
  
          responseData.forEach((cartItem) => {
            const existingProduct = consolidatedCart.find(
              (item) => item.product === cartItem.product
            );
  
            if (existingProduct) {
              existingProduct.quantity += cartItem.quantity;
            } else {
              consolidatedCart.push(cartItem);
            }
          });
  
          setCartItems(consolidatedCart);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, [userId]);


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

  const deleteCartItem = async (productId) => {
    try {
      const response = await axios.delete(`https://django-rest-framework-store.onrender.com/delete_cart_item/${userId}/${productId}/`);
      if (response.status === 204) {
        // Cart item deleted successfully
        // console.log('Cart item deleted');
        // Update the cart view if needed
        const updatedCartItems = cartItems.filter((item) => item.product !== productId);
        setCartItems(updatedCartItems);
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  
  return (
    <div class="cart-container">
    <h2>Cart</h2>
    {cartItems.length > 0 ? (
      <div class="cart-items">
        {cartItems.map((cartItem) => {
          const product = productData[cartItem.product];
          return (
            <div class="cart-item" key={cartItem.id}>
              {product && (
                <>
                  <img src={`https://django-rest-framework-store.onrender.com${product.image}`} alt={product.name} class="product-image" />
                  <div class="item-details">
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
                    <p><strong>Quantity:</strong> {cartItem.quantity}</p>
                    <button onClick={() => deleteCartItem(cartItem.product)}>Remove</button>
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
