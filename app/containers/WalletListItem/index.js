/**
 * WalletListItem
 *
 * Lists the name of a wallet
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ListItem from 'components/ListItem';
import WalletLink from './WalletLink';
import Wrapper from './Wrapper';

export class WalletListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    const apiUrl = `https://api.blockcypher.com/v1/bcy/test/wallets/${item.name}?token=${item.token}`;

    // Put together the content of the wallet
    const content = (
      <Wrapper>
        <WalletLink href={apiUrl} target="_blank">
          {item.name}
        </WalletLink>
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem key={`wallet-list-item-${item.id}`} item={content} />
    );
  }
}

WalletListItem.propTypes = {
  item: PropTypes.object,
};

export default connect(createStructuredSelector({}))(WalletListItem);
