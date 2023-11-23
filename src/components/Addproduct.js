import React from 'react'
import axios from 'axios'
import { useState } from 'react'


function Addproduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  function addProduct() {
    console.log("productAdded ", name, price);
    axios.post("https://django-rest-framework-store.onrender.com/products", { name: name, price: price, category: "" })((res) => {});
    }
    
  return (
    <>
    <div className="text-center">
      Name:
      <br />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      Price:
      <br />
      <input type="number" step="1" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <button className="btn btn-success" onClick={addProduct}>
        Add Product
      </button>
    </div>
  </>  
  )
}

export default Addproduct