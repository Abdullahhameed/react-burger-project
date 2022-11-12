import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // componentWillMount () {
    //     this.props.onInitPurchase();
    // }
    // state = {
    //     ingredients : null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         // ['salad', 1]
    //         if(param[0] === 'price') {
    //             price = param[1]
    //         } else{
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings} 
                                        checkoutCancelled={this.checkoutCancelledHandler} 
                                        checkoutContinued={this.checkoutContinuedHandler} />

                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }
        return summary;
        // (
            // <div>
                
                {/* <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} /> */}
                {/* <Route path={this.props.match.url + '/contact-data'} component={ContactData} /> */}
            {/* </div> */}
        // );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);