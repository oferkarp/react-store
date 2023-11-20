import React from 'react'
function add_Product() {
  console.log("product Added");
  }
  

function Addproduct() {
  return (
    <>
    Name:
    <br />
    <input />
    <br />
    Price:
    <br />
    <input type="number" step="0.01" />
    <br />
    <button className="btn btn-primary" onClick={add_Product}>
    Add Product
    </button>
    </>
    
  )
}

export default Addproduct