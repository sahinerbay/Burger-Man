import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../../hoc/wrapper';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const Layout = props => {
	return (
		<Wrapper>
			<Toolbar />
			<main className={classes.Content}>
				{props.children}
			</main>
		</Wrapper>
	);
};

Layout.propTypes = {

};

export default Layout;