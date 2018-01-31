import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../../hoc/wrapper';
import classes from './Layout.css';

const Layout = props => {
	return (
		<Wrapper>
			<div>
				Toolbar, SideDrawer, Backdrop
		</div>
			<main className={classes.Content}>
				{props.children}
			</main>
		</Wrapper>
	);
};

Layout.propTypes = {

};

export default Layout;