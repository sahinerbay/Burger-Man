import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const BurgerControls = props => {

	return (
		<div className={classes.BurgerControls}>
			<p>Current Price: <strong>{props.currentPrice.toFixed(2)}</strong></p>

			{controls.map(control => (
				<BurgerControl
					key={control.label}
					label={control.label}
					addIngredient={() => props.addIngredient(control.type)}
					removeIngredient={() => props.removeIngredient(control.type)}
					disabled={props.disabled[control.type]}
				/>
			))}

			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.order}>ORDER NOW!</button>
		</div>
	)
};

export default BurgerControls;