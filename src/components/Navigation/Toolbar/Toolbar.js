import React from "react";
import './Toolbar.css'; 
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
    <header className="Toolbar">
        {/* <div>Menu</div> */}
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="Logo-clse">
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;