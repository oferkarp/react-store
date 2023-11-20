import axios from 'axios'
import { useState } from 'react'

function Header() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  function addProduct() {
    console.log("productAdded ", name, price);
    axios.post("https://django-rest-product.onrender.com/product", { name: name, price: price, category: 1 })((res) => {});
    }
    
  return (
    <>
      Name:
      <br />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      Price:
      <br />
      <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <button className="btn btn-success" onClick={addProduct}>
        Add Product
      </button>
    </>
  )
}

export default Header
