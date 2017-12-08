import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';

import WalletListItem from 'containers/WalletListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import WalletsList from '../index';

describe('<WalletsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <WalletsList loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <WalletsList
          loading={false}
          error={{ message: 'Loading failed!' }}
        />
      </IntlProvider>
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the wallets if loading was successful', () => {
    const wallets = [{
      id: '58A884F8A8A47869138798',
      name: '58A884F8A8A47869138798',
    }];
    const renderedComponent = shallow(
      <WalletsList
        wallets={wallets}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={wallets} component={WalletListItem} />)).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <WalletsList
        wallets={false}
        error={false}
        loading={false}
      />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
