import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../../../hoc/Wrapper/wrapper';
import Button from './../../UI/Button/Button';

class OrderSummary extends React.Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(ingredientsKey => {
			return <li key={`ingredient_${ingredientsKey}`}><span style={{ textTransform: 'capitalize' }}>{ingredientsKey}:</span> {this.props.ingredients[ingredientsKey]}</li>
		});

		return (
			<Wrapper>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
				<p>Continue to Checkout...</p>
				<Button type="Danger" handleClick={this.props.modalInactive}>Cancel</Button>
				<Button type="Success" handleClick={this.props.orderNow}>Continue</Button>
			</Wrapper>
		)
	}
}

OrderSummary.propTypes = {
	ingredients: PropTypes.object.isRequired,
	totalPrice: PropTypes.number.isRequired,
	orderNow: PropTypes.func.isRequired,
	modalInactive: PropTypes.func.isRequired
};
        
export default OrderSummary;