import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.drawerToggleClicked} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated} 
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);