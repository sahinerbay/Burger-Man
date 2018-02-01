import React, { Component } from 'react';
import Aux from './../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerControls from './../../components/Burger/BurgerControls/BurgerControls';
import Modal from './../../components/UI/Modal/modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

const PRICE_LIST = {
	'salad': 0.5,
	'bacon': 1.0,
	'cheese': 0.8,
	'meat': 2.0
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 0,
		purchasable: false,
		modal: false
	};

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
		if (count == 0) {
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
		if (currentTotal == 0) {
			return;
		} else {
			newTotal = this.state.totalPrice - price;
		}

		//Set the state
		this.setState({ totalPrice: newTotal, ingredients: updatedIngredients });

		this.updatePurchaseState(updatedIngredients);
	}

	modalActive = () => this.setState({ modal: true });

	modalInactive = () => this.setState({ modal: false });

	render() {
		const disableIngredients = {
			...this.state.ingredients
		};

		for (let key in disableIngredients) {
			disableIngredients[key] = disableIngredients[key] === 0;
		}

		return (
			<Aux>
				<Modal show={this.state.modal} modalClose={this.modalInactive}>
					<OrderSummary
						modalActive={this.modalActive}
						modalInactive={this.modalInactive}
						ingredients={this.state.ingredients}
						totalPrice={this.state.totalPrice} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BurgerControls
					addIngredient={this.addIngredient}
					removeIngredient={this.removeIngredient}
					disabled={disableIngredients}
					currentPrice={this.state.totalPrice}
					purchasable={this.state.purchasable}
					order={this.modalActive} />
			</Aux>
		);
	}
}

export default BurgerBuilder;