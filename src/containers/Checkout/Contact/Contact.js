import React from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './Contact.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';

class Contact extends React.Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			zipcode: ""
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Test',
				address: {
					zipcode: '12345',
					city: 'test',
					country: 'test'
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'UPS-Express'
		};

		axios.post('/order.json', order)
			.then(res => {
				this.setState({ loading: false });
				this.props.history.push('/')
			})
			.catch(err => {
				this.setState({ loading: false });
			})
	}

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Name" />
				<input className={classes.Input} type="email" name="email" placeholder="Email" />
				<input className={classes.Input} type="text" name="street" placeholder="Street" />
				<input className={classes.Input} type="text" name="zipcode" placeholder="Zipcode" />
				<Button
					type="Success"
					handleClick={this.orderHandler}>ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className={classes.Contact}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default Contact;