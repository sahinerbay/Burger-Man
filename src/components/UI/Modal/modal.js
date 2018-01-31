import React from 'react';
import classes from './modal.css';

const modal = props => (
	<div className={props.show === true ? classes.Modal : `${classes.Modal} ${classes.Hidden}`}>
		{props.children}
	</div>
);

export default modal;