import React from 'react';
import Modal from './../../components/UI/Modal/modal';
import Wrapper from './../Wrapper/wrapper';

const errorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null
		};

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({ error: error });
			});
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor)
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