import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../../../hoc/wrapper';

const OrderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(ingredientsKey => {
		return <li key={`ingredient_${ingredientsKey}`}><span style={{ textTransform: 'capitalize' }}>{ingredientsKey}</span>{props.ingredients[ingredientsKey]}</li>
	});

	return (
		<Wrapper>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Continue to Checkout...</p>
		</Wrapper>
	);
};

OrderSummary.propTypes = {

};

export default OrderSummary;