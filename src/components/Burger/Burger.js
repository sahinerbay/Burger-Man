import React from 'react';
import PropTypes from 'prop-types';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {

	let transformedIngredients = Object.keys(props.ingredients)
		.map(ingEl => {
			console.log([...Array(props.ingredients[ingEl])])
			return [...Array(props.ingredients[ingEl])]
				.map((_, index) => {
					console.log(_)
					return <BurgerIngredient key={ingEl + index} type={ingEl} />
				})
		})
		//flatten array in order to check the length
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please Add Ingredients</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

Burger.propTypes = {

};

export default Burger;