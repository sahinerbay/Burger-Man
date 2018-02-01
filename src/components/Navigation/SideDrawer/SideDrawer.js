import React from 'react';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Wrapper from './../../../hoc/wrapper';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {

	const attachClasses = () => {
		let currentClasses = [classes.SideDrawer];
		if (props.open) return [...currentClasses, classes.Open].join(' ');
		return [...classes, classes.Close].join(' ');
	}

	return (
		<Wrapper>
			<Backdrop show={props.open} handleClick={props.closed} />
			<div className={attachClasses()}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Wrapper>
	);
}

export default SideDrawer;