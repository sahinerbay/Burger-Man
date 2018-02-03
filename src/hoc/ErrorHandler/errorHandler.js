import React from 'react';
import Modal from './../../components/UI/Modal/modal';
import Wrapper from './../Wrapper/wrapper';

const errorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null
		};

		componentDidMount() {
			axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			axios.interceptors.response.use(res => res, error => {
				this.setState({ error: error });
			});
		}

		errorConfirmHandler = () => {
			this.setState({ error: null })
		}

		render() {
			return (
				<Wrapper>
					<Modal
						show={this.state.error}
						modalClose={this.errorConfirmHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</ Wrapper>
			)
		}
	}
};

export default errorHandler;