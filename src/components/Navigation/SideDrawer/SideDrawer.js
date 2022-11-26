import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import './SideDrawer.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const SideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close'];
    if(props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={ attachedClasses.join(' ') }>
                <div className="Logo-cls">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default SideDrawer