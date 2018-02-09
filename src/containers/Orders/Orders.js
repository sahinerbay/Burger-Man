import React from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import errorHandler from './../../hoc/ErrorHandler/errorHandler';

class Orders extends React.Component {
	state = {
		orders: [],
		loading: true
	}

	componentDidMount() {
		axios.get('/orders.json')
			.then(response => {
				const fetchOrders = [];
				for (let key in response.data) {
					fetchOrders.push({
						...response.data[key],
						id: key
					})
				}
				this.setState({ loading: false, orders: fetchOrders })
			})
			.catch(() => {
				this.setState({ loading: false })
			})
	}
	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order 
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}/>
				))}
			</div>
		)
	}
}

export default errorHandler(Orders, axios);