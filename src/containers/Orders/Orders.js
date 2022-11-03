import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders : [],
        isLoading : true
    }

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            const fetchOrders = [];
            for(let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            console.log(res.data)
            this.setState({ isLoading: false, orders: fetchOrders});
        }).catch(error => {
            this.setState({ isLoading: false});
        })
    }
    render () {
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);