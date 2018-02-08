import React from 'react';
import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div className={classes.Burger}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button type="Danger" handleClick={props.checkoutCancelled}>Cancel</Button>
			<Button type="Success" handleClick={props.checkoutContinued}>Continue</Button>
		</div>
	)
};

export default CheckoutSummary;