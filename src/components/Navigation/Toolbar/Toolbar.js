import React from 'react';
import PropTypes from 'prop-types';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const Toolbar = props => {
	return (
		<div>
			<header className={classes.Toolbar}>
				<div>Menu</div>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav className={classes.DesktopOnly}>
				<NavigationItems />
				</nav>
			</header>
		</div>
	);
};

Toolbar.propTypes = {

};

export default Toolbar;