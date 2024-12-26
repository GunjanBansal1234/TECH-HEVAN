import React from 'react'
import './Footer.css'


const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-9 col-p-6  col-m-4footer col-m-12" >
                            <h1 className='tech'>TECH <span style={{ color: '#eac38a' }}>HAVEN</span></h1>


                            <p>Awesome grocery store website template

                            </p>

                            <address> Address: 5171 W Campbell , Utah 53127 India

                            </address>
                            <p> Call Us: (+91) - 540-025-124553

                            </p>
                            <p> Email: Teach@Hevan.com

                            </p>
                            <p> Hours: 10:00 - 18:00, Mon - Sat

                            </p>
                        </div>
                       
                        
                        <div className="col-3 col-p-6 col-m-8 center5">
                            <div className="bran">
                            <span className='social '>Follow Us </span>
                            <br></br><br></br>
                            <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-youtube"></i>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer    