import React from 'react';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Wrapper from './../../../hoc/Wrapper/wrapper';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

	return (
		<Wrapper>
			<Backdrop show={props.open} handleClick={props.closed} />
			<div className={attachedClasses.join(' ')}>
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