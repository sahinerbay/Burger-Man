import React from 'react';
import classes from './BurgerControl.css';
import PropTypes from 'prop-types';

const BurgerControl = props => {
	return (
		<div className={classes.BurgerControl}>
			<div className={classes.Label}>{props.label}</div>
			<button
				className={classes.Less}
				onClick={props.removeIngredient}
				disabled={props.disabled}>Less</button>
			<button
				className={classes.More}
				onClick={props.addIngredient}>More</button>
		</div>
	);
};

BurgerControl.propTypes = {

};

export default BurgerControl;