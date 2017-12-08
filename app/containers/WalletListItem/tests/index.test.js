/**
 * Test the wallet list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';

import ListItem from 'components/ListItem';
import { WalletListItem } from '../index';

const renderComponent = (props = {}) => render(
  <IntlProvider locale="en">
    <WalletListItem {...props} />
  </IntlProvider>
);

describe('<WalletListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      id: '58A884F8A8A47869138798',
      name: '58A884F8A8A47869138798',
      token: '14c71464e5d0323691q7c314b42eg04',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <WalletListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should render the wallet name', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toContain(item.name);
  });
});
