import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer : false });
    }

    drawerToggleClicked = () => {
        this.setState((prevState) => { 
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.drawerToggleClicked} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;