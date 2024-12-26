import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import './Header.css'
import { useSelector } from 'react-redux';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const cart = useSelector(state => state.crt.carts);

    const open = Boolean(anchorEl);

    const toggleMobileMenu = () => {
        setIsMobile(!isMobile);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navigation-wrap  " id='navbar'>
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <h1 className='tech'>TECH <span style={{ color: '#eac38a' }}>HAVEN</span></h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-stream navbar-toggler-icon" style={{ color: 'white', marginTop: 15 }}></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-3">
                            <li className="nav-item">
                                <a className="nav-link" href="/" >Home</a>

                            </li>
                        </ul>

                    </div>
                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}


                    >

                        <Link to='/cart'>
                            <i
                                className="fa-solid fa-cart-shopping " id='shop'


                            ></i>
                        </Link>

                    </Badge>
                </div>

            </nav>

        </>
    )
}

export default Header