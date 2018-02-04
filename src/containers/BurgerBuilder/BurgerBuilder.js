import React, { Component } from 'react';
import Wrapper from './../../hoc/Wrapper/wrapper';
import Burger from './../../components/Burger/Burger';
import BurgerControls from './../../components/Burger/BurgerControls/BurgerControls';
import Modal from './../../components/UI/Modal/modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import errorHandler from './../../hoc/ErrorHandler/errorHandler';

const PRICE_LIST = {
	'salad': 0.5,
	'bacon': 1.0,
	'cheese': 0.8,
	'meat': 2.0
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios.get('/ingredients.json')
			.then(res => {
				this.setState({ ingredients: res.data })
			})
			.catch(error => {
				this.setState({ error: true })
			})
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).reduce((total, ingredientKey) => total + ingredients[ingredientKey], 0);
		this.setState({ purchasable: sum > 0 })
	}

	addIngredient = type => {
		//Increase the current count of the ingredient
		let count = this.state.ingredients[type] + 1;
		//Clone the state
		let updatedIngredients = {
			...this.state.ingredients
		};
		//Update the count in the cloned state
		updatedIngredients[type] = count;

		//Retrieve the price of the ingredient
		let price = PRICE_LIST[type];
		//Calculate new total
		let newTotal = this.state.totalPrice + price;

		//Set the state
		this.setState({ totalPrice: newTotal, ingredients: updatedIngredients });

		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredient = type => {
		let count = this.state.ingredients[type];
		if (count === 0) {
			return;
		} else {
			count = count - 1;
		}

		//Clone the state
		let updatedIngredients = {
			...this.state.ingredients
		};
		//Update the count in the cloned state
		updatedIngredients[type] = count;

		//Retrieve the price of the ingredient
		let price = PRICE_LIST[type];
		//Calculate new total
		let currentTotal = this.state.totalPrice;
		let newTotal;
		if (currentTotal === 0) {
			return;
		} else {
			newTotal = this.state.totalPrice - price;
		}

		//Set the state
		this.setState({ totalPrice: newTotal, ingredients: updatedIngredients });

		this.updatePurchaseState(updatedIngredients);
	}

	modalActive = () => this.setState({ purchasing: true });

	modalInactive = () => this.setState({ purchasing: false });

	purchaseReady = () => {
		this.setState({ loading: true });

		const order = {
			ingredients: this.state.ingredients,
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
			.then(res => this.setState({ loading: false, purchasing: false }))
			.catch(err => {
				this.setState({ loading: false, purchasing: false });
			})
	}

	render() {
		const disableIngredients = {
			...this.state.ingredients
		};

		for (let key in disableIngredients) {
			disableIngredients[key] = disableIngredients[key] === 0;
		}

		let orderSummary = null;
		let burgerLoading = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
		if (this.state.ingredients) {
			burgerLoading = (
				<Wrapper>
					<Burger ingredients={this.state.ingredients} />
					<BurgerControls
						addIngredient={this.addIngredient}
						removeIngredient={this.removeIngredient}
						disabled={disableIngredients}
						currentPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						order={this.modalActive} />
				</Wrapper>
			);
			orderSummary = <OrderSummary
				orderNow={this.purchaseReady}
				modalInactive={this.modalInactive}
				ingredients={this.state.ingredients}
				totalPrice={this.state.totalPrice} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Wrapper>
				<Modal show={this.state.purchasing} modalClose={this.modalInactive}>
					{orderSummary}
				</Modal>
				{burgerLoading}
			</Wrapper>
		);
	}
}

export default errorHandler(BurgerBuilder, axios);