import React, { useEffect } from 'react';
import { fetchProducts } from '../../ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import "./Products.css"
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { addToCart } from '../../CartSlice';


const ApiProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.pro.products); // Ensure 'pro.products' is correctly defined in your Redux state.

  useEffect(() => {
    dispatch(fetchProducts());

  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        {products && products.length > 0 ? (
          products.map((element) => (
            <div className="col-lg-3 col-mb-6 col-p-12   " key={element.id}>
              <div className="card" >
                <div className="top" >

                  <img
                    src={element.images}
                    alt='products'
                    className="card-img-top"
                  />
                  <div className="black-div" >
                    <div className='title9'>{element.title}</div>
                    <div className="price">
                      <span >Price : {element.price}</span>


                    </div>
                    <div className="details">
                      <Link to={`/product/${element.id}`} id='productDetails'>Product Details</Link>

                    </div>
                    <button
                      id='btn8'
                      onClick={() => dispatch(addToCart(element))}

                    >
                      Add to Cart
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (

          <div className="spinner-container">
            {/* Customize the spinner size and color */}
            <ClipLoader size={50} color="#e1afb9" className='spinner' />
          </div>


        )}
      </div>
    </div>
  );
};

export default ApiProducts;
