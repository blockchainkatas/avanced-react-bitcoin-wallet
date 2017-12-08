/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectWallets, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import WalletsList from 'components/WalletsList';
import CenteredSection from '../HomePage/CenteredSection';
import TokenForm from './TokenForm';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { checkToken } from '../App/actions';
import { changeToken } from './actions';
import { makeSelectToken } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state token is not null, submit the form to store token
   */
  componentDidMount() {
    if (this.props.token && this.props.token.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, wallets } = this.props;
    const walletsListProps = {
      loading,
      error,
      wallets,
    };

    return (
      <article>
        <Helmet>
          <title>Login Page</title>
          <meta name="description" content="A React.js Boilerplate application loginpage" />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.loginHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.loginMessage} />
            </p>
          </CenteredSection>
          <Section>
            <TokenForm onSubmit={this.props.onSubmitForm}>
              <label htmlFor="token">
                <FormattedMessage {...messages.loginWithBlockCypherToken} />
                <Input
                  id="token"
                  type="text"
                  placeholder="your BlockCypher token"
                  value={this.props.token}
                  onChange={this.props.onChangeToken}
                />
              </label>
            </TokenForm>
            <WalletsList {...walletsListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  wallets: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  token: PropTypes.string,
  onChangeToken: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeToken: (evt) => dispatch(changeToken(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkToken());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  wallets: makeSelectWallets(),
  token: makeSelectToken(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
