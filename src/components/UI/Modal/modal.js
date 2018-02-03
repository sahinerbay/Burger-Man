import React from 'react';
import classes from './modal.css';
import Backdrop from './../Backdrop/Backdrop';
import Wrapper from './../../../hoc/Wrapper/wrapper';

class Modal extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
	}

	render() {
		return (
			<Wrapper>
				<Backdrop show={this.props.show} handleClick={this.props.modalClose} />
				<div className={this.props.show ? `${classes.Modal} ${classes.Show}` : `${classes.Modal} ${classes.Hidden}`}>
					{this.props.children}
				</div>
				
			</Wrapper>
		)
	}
}

export default Modal;