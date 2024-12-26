import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import Footer from '../src/components/Footer/Footer'

import ProductDetails from './ProductDetails/ProductDetails'
import Cart from './components/Cart/Cart'
import { ClipLoader } from 'react-spinners';    
import Checkout  from '../src/components/Checkout'


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);  
    }, 1000);
  }, []);

  return (
<>
{loading ? (
        <div className="spinner-container">
          {/* Customize the spinner size and color */}
          <ClipLoader size={50} color="#e1afb9" className='spinner' />
        </div>
      ) : (
    <div>
<Header />
<Routes>
  <Route path='/' element = {<Home />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path='/cart' element = {<Cart />} />
  <Route path='/check' element = {<Checkout />} />

  
</Routes>
<Footer />
</div>
      )}

</>

  )
}

export default App