import React from 'react';
import PropTypes from 'prop-types';
import Logo from './../../Logo/logo';
import classes from './Toolbar.css';

const Toolbar = props => {
	return (
		<div>
			<header className={classes.Toolbar}>
				<div>Menu</div>
				<Logo />
				<nav>
					...
				</nav>
			</header>
		</div>
	);
};

Toolbar.propTypes = {
	
};

export default Toolbar;