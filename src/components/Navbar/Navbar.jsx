import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Menu , MenuItem, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/phraten.png'
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    // Hooks
    const classes = useStyles();
    const location = useLocation();

  return (
    <>
        <AppBar position="fixed" className= {classes.appBar} color="inherit" >
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                    Commerce.js
                </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' && (
                <div className={classes.button} >
                     <IconButton component={Link} to="/cart" area-label="Show Cart Items" color="inherit">
                        <Badge  badgeContent={totalItems} overlap="rectangular" color="secondary" ></Badge>
                        <ShoppingCart />
                     </IconButton>
                </div> )}
            </Toolbar>
        </AppBar>   
    </>
  )
}

export default Navbar