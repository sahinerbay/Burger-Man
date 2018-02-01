import React from 'react';
import classes from './modal.css';
import Backdrop from './../Backdrop/Backdrop';
import Wrapper from './../../../hoc/wrapper';

const modal = props => {

	return (
		<Wrapper>
			<Backdrop show={props.show} handleClick={props.modalClose} />
			<div className={props.show === true ? classes.Modal : `${classes.Modal} ${classes.Hidden}`}>
				{props.children}
			</div>
		</Wrapper>
	)
};

export default modal;