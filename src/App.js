import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Product from './components/product'
import Navbar from './components/Navbar'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import NoPage from './components/NoPage'
import MyFooter from './components/MyFooter'
import Addproduct from './components/Addproduct'
import Home from './components/Home'
import Cart from './components/Cart'
import Registration from './components/Registration'
import Order from './components/Order'
// import { BrowserRouter } from 'react-router-dom';


function App() {
  const HOST_URL = "https://django-rest-framework-store.onrender.com/products";
  const [products, setProducts] = useState([])
  const [cateogries, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([""])
  const [key, setKey] = useState(0);

// logout and login refresh
  const refreshPage = () => {
    setKey((prevKey) => prevKey + 1); // Update the key to force a refresh
  };

  useEffect(getCategories, []) // when loading the page for the first time - getCategories()

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

// get all the category from backend
  function getCategories() {
    axios
      .get(HOST_URL + "/category/")
      .then((response) => {
        // console.log('categories', response.data)
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  function handleCategoryClick(categoryId) {
    // console.log(categoryId)
    setFilteredProducts(categoryId)
  }

  
function searchproduct(filterdProductname) {
  // console.log(filterdProductname);

  axios
    .get(HOST_URL + "/?search=" + filterdProductname)
    .then((response) => {
      console.log('product', response.data);
      if (response.data.length === 0) {
        // Alert when no products are found
        alert("No products found for the search");
        // Update the products state with an empty array to clear any previous results
        setProducts([]);
      } else {
        // Update the products state with the search results
        setProducts(response.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // Handle the error, for instance, displaying an error message
    });
  
  setFilteredProducts(""); // Clear the search input
}


  return (
    <>
      <HashRouter key={key}>
        <Navbar categories={cateogries} handleCategoryClick={handleCategoryClick} searchproduct={searchproduct} refreshPage={refreshPage} />
        <Routes>
          <Route
            path="/react-store"
            element={
              <>
                <div className="container">
                  <div className="row">
                    {products.map((product) => (
                      <Product key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </>
            }
          />
          <Route path="/login" element={<Login refreshPage={refreshPage} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add_product" element={<Addproduct />} />
          <Route path="/cart/:userId" element={<Cart />} />
          <Route path="/order/:userId" element={<Order />} />
          <Route path='/register' element={<Registration />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <MyFooter />
        </HashRouter>
    </>
  )
}

export default App
