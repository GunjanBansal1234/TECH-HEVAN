import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row ,Col, Carousel } from 'react-bootstrap'
const Slider = () => {
    return (
        <>
                     <Carousel>
                        <Carousel.Item>
                            <img src="/lak1.webp" alt="slide1" id='hello'  className='d-block w-100  '  loading='lazy' />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="/lak2.webp" alt="slide2"   className='d-block w-100  ' loading='lazy'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="/lak3.webp" alt="slide3"   className='d-block w-100  ' loading='lazy'/>
                        </Carousel.Item>
     
                     </Carousel>
                   </>
    )
}

export default Slider