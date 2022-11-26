import React from "react";
import './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {
            !props.isAuthenticated 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
        {/* <NavigationItem link="/">Checkout</NavigationItem> */}
        {/* <NavigationItem link="/">Logout</NavigationItem> */}
    </ul>
);

export default NavigationItems;