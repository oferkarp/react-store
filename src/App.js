import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Product from './components/product'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import NoPage from './components/NoPage'
import MyFooter from './components/MyFooter'
import Addproduct from './components/Addproduct'

function App() {
  const HOST_URL = "http://127.0.0.1:8000/products";
  // https://django-rest-product.onrender.com/product
  const [products, setProducts] = useState([])
  const [cateogries, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([""])
  

  useEffect(getCategories, []) // when loading the page for the first time - getCategories()

  function handleCategoryClick(categoryId) {
    console.log(categoryId)
    setFilteredProducts(categoryId)
  }

  
  function getCategories() {
    axios
      .get(HOST_URL + "/category/")
      .then((response) => {
        console.log('categories', response.data)
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  function searchproduct(filterdProductname) {
    console.log(filterdProductname)
    axios
    .get(HOST_URL + "/?search=" + filterdProductname)
    .then((response) => {
      console.log('product', response.data)
      setProducts(response.data) // Update the products state
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
    setFilteredProducts("dfdgsgdfgdfgdf")
  }

  useEffect(() => {
    // Fetch products when the component mounts
    axios
      .get(HOST_URL + "/?category=" + filteredProducts)
      .then((res) => {
        setProducts(res.data) // Update the products state
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }, [filteredProducts])

  return (
    <>
      <BrowserRouter>
        <Navbar categories={cateogries} handleCategoryClick={handleCategoryClick} searchproduct={searchproduct} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="container">
                  <div className="row">
                    {products.map((product) => (
                      <Product key={product.id} product={product} />
                    ))}
                  </div>
                  {/* <Header></Header> */}
                </div>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/add_product" element={<Addproduct />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  )
}

export default App
