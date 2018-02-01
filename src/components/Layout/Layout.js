import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './../../hoc/wrapper';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends React.Component {
	state = {
		showSideDrawer:true
	};

	sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });

	render() {
		return (
			<Wrapper>
				<Toolbar />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Wrapper>
		)
	}
}

Layout.propTypes = {

};

export default Layout;