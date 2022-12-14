// import classes from './App.css';
import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
          <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
          <Switch>
                <Route path="/checkout" component={Checkout}></Route>
                <Route path="/orders" component={Orders}></Route>
                <Route path="/logout" component={Logout}></Route>
                <Route path="/auth" component={Auth}></Route>
                <Route path="/" component={BurgerBuilder}></Route>
                <Redirect to="/" />
          </Switch>
      )
    }
      return (
        <div>
          <Layout>
            {routes}
                
            {/* <Route path="/" component={Checkout} />
            <Route path="/" component={Checkout} /> */}
            
            {/* <BurgerBuilder />
            <Checkout /> */}
          </Layout>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => (actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
