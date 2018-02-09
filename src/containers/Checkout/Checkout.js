import React from 'react';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contact from './Contact/Contact';

class Checkout extends React.Component {
	state = {
		ingredients: null,
		totalPrice: 0
	}

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for (let param of query.entries()) {
			if (param[0] === "price") {
				this.setState({ totalPrice: param[1] })
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients })
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact')
	}
	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}/>
				<Route
					path={`${this.props.match.path}/contact`}
					render={(routeParams) => (<Contact {...routeParams} ingredients={this.state.ingredients} price={this.state.totalPrice}  />)} />
			</div>
		)
	}
}

export default Checkout;