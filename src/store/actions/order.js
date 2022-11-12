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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData).then(responce => {
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json').then(res => {
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