import React from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './Contact.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';

class Contact extends React.Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true,
					minLength: 4
				},
				isValid: false,
				touched: false
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip code'
				},
				value: '',
				validation: {
					required: true,
					maxLength: 5
				},
				isValid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street name'
				},
				value: '',
				validation: {
					required: true,
				},
				isValid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email address'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'cheapest', displayValue: 'Cheapest' },
						{ value: 'fastest', displayValue: 'Fastest' }
					]
				},
				validation: {},
				isValid: true,
				value: 'cheapest'
			}
		},
		isFormValid: false,
		loading: false,
	};

	orderHandler = (event) => {
		//Prevent default clicking onSubmit
		event.preventDefault();

		//Create new object to store contact info details
		const formData = {};
		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value
		}

		//Show spinner
		this.setState({ loading: true });
		//Store order details
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};

		//Sends the order to firebase
		axios.post('/orders.json', order)
			.then(res => {
				this.setState({ loading: false });
				this.props.history.push('/')
			})
			.catch(err => {
				this.setState({ loading: false });
			})
	}

	changeHandler = (event, formKey) => {
		const clonedForm = { ...this.state.orderForm };
		const clonedFormElement = { ...clonedForm[formKey] };

		clonedFormElement.value = event.target.value;
		clonedFormElement.isValid = this.checkValidity(clonedFormElement.value, clonedFormElement.validation);
		clonedFormElement.touched = true;
		clonedForm[formKey] = clonedFormElement;

		let isFormValid = true;
		for (let validity in clonedForm) {
			if (clonedForm[validity]) {
				isFormValid = clonedForm[validity].isValid && isFormValid
			}
		}
		this.setState({
			orderForm: clonedForm,
			isFormValid
		})
	}

	checkValidity = (value, rules) => {
		let isValid = true;

		if(!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length >= rules.maxLength && isValid;
		}
		return isValid;
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(el => (
					<Input
						key={el.id}
						elementType={el.config.elementType}
						elementConfig={el.config.elementConfig}
						value={el.config.value}
						isValid={el.config.isValid}
						shouldValidate={el.config.validation}
						touched={el.config.touched}
						changed={(event) => this.changeHandler(event, el.id)} />
				))}
				<Button
					type="Success"
					disabled={!this.state.isFormValid}>ORDER</Button>
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