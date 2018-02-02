import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../Wrapper/wrapper';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends React.Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });

	sideDrawerToggleHandler = () => this.setState((prevState) => {
		return { showSideDrawer: !prevState.showSideDrawer }
	});

	render() {
		return (
			<Wrapper>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Wrapper>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;