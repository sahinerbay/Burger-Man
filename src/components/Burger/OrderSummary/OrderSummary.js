import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../../../hoc/wrapper';
import Button from './../../UI/Button/Button';

const OrderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(ingredientsKey => {
		return <li key={`ingredient_${ingredientsKey}`}><span style={{ textTransform: 'capitalize' }}>{ingredientsKey}:</span> {props.ingredients[ingredientsKey]}</li>
	});

	return (
		<Wrapper>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
			<p>Continue to Checkout...</p>
			<Button type="Danger" handleClick={props.modalInactive}>Cancel</Button>
			<Button type="Success" handleClick={props.modalActive}>Continue</Button>
		</Wrapper>
	);
};

OrderSummary.propTypes = {

};

export default OrderSummary;