import React from 'react';
import classes from './Button.css';

const Button = props => (
	<button
		onClick={props.handleClick}
		className={[classes.Button, classes[props.type]].join(' ')}
		disabled={props.disabled}>{props.children}</button>
);

export default Button;