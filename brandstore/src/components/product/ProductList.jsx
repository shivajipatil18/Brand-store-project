import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/shoppingcart/productSlice";
import { addProduct } from "../../features/shoppingcart/cartSlice";
const ProductList = () => {
const {items:products,status}=useSelector(state => state.products);
const cart = useSelector(state => state.cart);
const dispatch=useDispatch();
useEffect(()=>{
  if(status==='idle'){
    dispatch(fetchProducts());
  }
},[status])
if(status==='loading'){
  return <h1>Loading...</h1>;
}
if(status==='failed'){
  return <h1>Failed to load products</h1>;  
}
    return (
      <>
      
        <div className="product-list-container">
          <div className="product-list">
            {products.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={product.image} alt={product.title} />
                <div className="product-item-details">
                  <h3>{product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}</h3>
                  <p>Price: RS{product.price}</p>
                  <button className="addtocartbtn" onClick={()=>dispatch(addProduct(product))}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  
  return (
    <>
      <Navbar />
      <div className="product-list-container">
        <div className="product-list">
          <div className="product-item">
            <img src="image path" alt="product" />
            <div className="product-item-details">
              <h3>Product Name</h3>
              <p>Price: $9.99</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductList;
