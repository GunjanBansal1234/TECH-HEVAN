import React from 'react'
import { removeFromeCart, increment, decrement } from '../../CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './CartDetails.css'


const CartDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.crt.carts);
  let total = 0;
  let count = 0;

  // Calculate total and count
  for (let row of cart) {
    count = count + row.q;
    total = total + (row.price * row.q);
  }

  // Handle increment and decrement
  const handleIncrement = (e) => {
    dispatch(increment(e));
  };

  const handleDecrement = (e) => {
    dispatch(decrement(e));
  };

  return (
    <>
      <h4 style={{ fontWeight: 700, marginTop: '1rem', marginLeft: 5, fontFamily: 'sans-serif', textAlign: 'center' }}>SHOPPING CART</h4>


      {cart.length === 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-12" width='100' height='50'>
              <img src="empty.webp" class="rounded mx-auto d-block" alt="empty" style={{ width: 220 }} />
              <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 700 }}>Your Cart is Empty
              </p>
              <div className="col-12"><Link to='/' title="Go to homepage" ><p style={{ color: "#eac38a", fontWeight: 700, fontSize: 20, textAlign: 'center' }} >continue shopping</p>
              </Link >
              </div>
            </div>
          </div>
        </div>

      ) : (

        <div className='top'>

          {cart.map((e, i) => {
            return (
              <div

                key={e.id} // Using the product id as a unique key
              >
                <div className="container">
                  <div className="row">
                    <div className="col-9 col-p-12 col-m-12 flex">
                      <img src={e.images} alt="product-details-single" style={{ width: 150, height: 170 }} />
                      <p className='title5'>{e.title}</p>
                      <p className='title5'>Rs {e.price}</p>

                    </div>
                    <div className="col-3 col-p-12 col-m-12">
                      <div className="quantity-container " style={{ display: 'flex', alignItems: 'center', gap: '10' }}>

                        <button onClick={() => handleIncrement(e)} className="increment-btn " style={{ fontSize: 20 }} >+</button>
                        <p className="quantity-display"> {e.q}</p>
                        <button onClick={() => handleDecrement(e)} className="decrement-btn" style={{ fontSize: 20 }}>-</button>

                        <p className='remove'>
                          <strong>Remove: </strong>
                          <span>
                            <i
                              className="fas fa-trash"
                              onClick={() => dispatch(removeFromeCart(i))}
                              style={{ color: '#eac38a', fontSize: 20, cursor: 'pointer' }}
                            ></i>
                          </span>
                        </p>

                      </div>

                    </div>
                  </div>
                </div>

              </div>

            );
          })}
        </div>

      )}
      <>

        <div style={{ marginTop: 20 }}>
          <h4 id='hello88' style={{ color: 'black', textAlign: 'center', textTransform: 'uppercase', fontSize: 20 }}>Cart Amount : {total}</h4>
        </div>

        <div className="col-12">
          <div className="checkout" style={{ marginBottom: 20 }}>

            <Link to='/check' className='check1'>Proceed to Checkout</Link>
          </div>
        </div>

      </>


    </>



  )
}

export default CartDetails