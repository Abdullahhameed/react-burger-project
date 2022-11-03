import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as actionType from '../../store/action';

class BurgerBuilder extends Component {

    state = {
        // ingredients : null,
        // totalPrice : 4,
        // purchaseable: false,
        purchasing : false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log('bb', this.props);
        // axios.get('https://react-burger-project-e24a3-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(responce => {
        //         this.setState({ingredients: responce.data})
        //     }).catch(error => {
        //         this.setState({ error: true });
        //     });
    }
    

    updatePurchaseState(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
        // this.setState({ purchaseable: sum > 0 });
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
        // const queryParams = [];
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search : '?' + queryString
        // });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
            // ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        } 
        let orderSummary = null;


        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings) {
            burger = (
                <Auxiliary>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                                        ingredientRemoved={this.props.onIngredientRemoved} 
                                        disabled={disabledInfo} 
                                        purchaseable={this.updatePurchaseState(this.props.ings)}
                                        ordered={this.purchaseHandler}
                                        price={this.props.price} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                            purchaseCancelled={this.purchaseCancelHandler}
                                            price={this.props.price}
                                            purchaseContinued={this.purchaseContinueHandler} />;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        // Output {salad:true, meat:false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                {burger}
                {/* <div>Build Controls</div> */}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));