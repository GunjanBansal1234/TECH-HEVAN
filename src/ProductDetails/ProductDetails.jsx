import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../CartSlice';

import './ProductDetails.css'
const ProductDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.pro.products.find((item) => item.id === parseInt(id))
  );

  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: 5 }}>Product not found!</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="img-center">
            <img src={product.images} alt="product-details" id='imgh' />
          </div>
        </div>
        <div className="col-lg-6  col-md-6 col-sm-6">
          <div className="product-items">
            <h4>{product.title}</h4>
            <span>Price : {product.price}</span>
            <p className='des'>{product.description}</p>
            <p>Rating: {product.reviews[0].rating}</p>

            <p>Comment: {product.reviews[0].comment}</p>

            <p>Date: {product.reviews[0].date}</p>
            <p>Name : {product.reviews[0].reviewerName}</p>

            <p>Email : {product.reviews[0].reviewerEmail}</p>

<button className="btn" onClick={() => dispatch(addToCart(product))}>
  Add to Cart
</button>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
