import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [productData, setProductData] = useState({})
  const { userId } = useParams()

  // Fetches cart items for a specific user from the server
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`https://django-rest-framework-store.onrender.com/user_cart_items/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          const consolidatedCart = [];
  
          responseData.forEach((cartItem) => {
            const existingProduct = consolidatedCart.find((item) => item.product === cartItem.product);
  
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


  // Fetches product details for each cart item
  useEffect(() => {
    const fetchProduct = async (productId) => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`https://django-rest-framework-store.onrender.com/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        });
  
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
  

  // Deletes a specific item from the cart
  const deleteCartItem = async (productId) => {
    try {
      const authToken = localStorage.getItem('token');
  
      const response = await axios.delete(
        `https://django-rest-framework-store.onrender.com/delete_cart_item/${userId}/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 204) {
        const updatedCartItems = cartItems.filter((item) => item.product !== productId);
        setCartItems(updatedCartItems);
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };
  

  // Initiates the checkout process
  const checkout = async () => {
    try {
      console.log('Cart Items:', cartItems);
  
      const authToken = localStorage.getItem('token');
  
      const response = await axios.post(
        `https://django-rest-framework-store.onrender.com/checkout/`,
        {
          cartItems: cartItems.map((item) => ({ product: item.product, quantity: item.quantity })),
          userId: userId, 
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        setCartItems([]);
        clearCart(userId);
        alert('Order complete');
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  

  // Clears the entire cart for a user
  const clearCart = async (userId) => {
    try {
      const authToken = localStorage.getItem('token')

      const response = await axios.post(
        `https://django-rest-framework-store.onrender.com/clear_cart/${userId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        // console.log('Cart cleared successfully')
        setCartItems([])

        // Perform any additional actions after clearing the cart
      } else {
        console.error('Failed to clear cart')
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  // Rendering the cart interface
  return (
    <div className="cart-container">
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Your cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((cartItem) => {
            const product = productData[cartItem.product]
            return (
              <div className="cart-item" key={cartItem.id}>
                {product && (
                  <>
                    <img src={`https://django-rest-framework-store.onrender.com${product.image}`} alt={product.name} className="product-image" />
                    <div className="item-details">
                      <p>
                        <strong>Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {cartItem.quantity}
                      </p>
                      <button onClick={() => deleteCartItem(cartItem.product)}>Remove</button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button style={{ marginRight: '10px' }} onClick={checkout}>
            Checkout
          </button>
          <button onClick={() => clearCart(userId)}>Clear Cart</button>
        </div>
      )}
    </div>
  )
}

export default Cart
