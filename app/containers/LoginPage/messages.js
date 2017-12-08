/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  loginMessage: {
    id: 'boilerplate.containers.LoginPage.loginMessage',
    defaultMessage: 'Paste your BlockCypher API token and click enter. If you token is valid you should see the list of your wallets.',
  },
  loginHeader: {
    id: 'boilerplate.containers.LoginPage.login.header',
    defaultMessage: 'Login',
  },
  loginWithBlockCypherToken: {
    id: 'boilerplate.containers.LoginPage.tryme.loginWithBlockCypherToken',
    defaultMessage: 'BlockCypher token: ',
  },
});
