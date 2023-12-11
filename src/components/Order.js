import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function Order() {
  const [orders, setOrders] = useState([]);
  const [productData, setProductData] = useState({});
  const { userId } = useParams();

  // Fetches orders for a specific user from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`https://django-rest-framework-store.onrender.com/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setOrders(responseData);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);


  // Fetches product details for each item in the user's orders
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

    orders.forEach((order) => {
      order.cart_items.forEach((cartItem) => {
        if (!productData[cartItem.product]) {
          fetchProduct(cartItem.product);
        }
      });
    });
  }, [orders, productData]);


  // Renders the list of orders and their respective items
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          {/* <p>Order ID: {order.id}</p> */}
          <p>Date: {new Date(order.create_date).toLocaleString()}</p>
          <div className="cart-items">
            {order.cart_items.map((cartItem) => {
              const product = productData[cartItem.product];
              return (
                <div className="cart-item" key={cartItem.product}>
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
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
