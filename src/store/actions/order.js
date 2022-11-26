import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { fetchOrdersFail, fetchOrdersStart, fetchOrdersSuccess } from './burgerBuilder';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}

export const purchaseBurgerStart =() => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData).then(responce => {
            dispatch(purchaseBurgerSuccess(responce.data, orderData))
        }).catch(error => {
            dispatch(purchaseBurgerFail(error))
        }); 
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        // axios.get('/orders.json?auth=' + token).then(res => {
        axios.get('/orders.json' + queryParams).then(res => {
            const fetchOrders = [];
            for(let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            dispatch(fetchOrdersSuccess(fetchOrders))
            // console.log(res.data)
            // this.setState({ isLoading: false, orders: fetchOrders});
        }).catch(error => {
            dispatch(fetchOrdersFail(error));
            // this.setState({ isLoading: false});
        })
    }
}