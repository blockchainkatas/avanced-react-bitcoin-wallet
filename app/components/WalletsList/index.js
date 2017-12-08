import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import WalletListItem from 'containers/WalletListItem';

function WalletsList({ loading, error, wallets }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (wallets !== false) {
    return <List items={wallets} component={WalletListItem} />;
  }

  return null;
}

WalletsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  wallets: PropTypes.any,
};

export default WalletsList;
