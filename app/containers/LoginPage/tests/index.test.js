/**
 * Test the LoginPage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import WalletsList from 'components/WalletsList';
import { LoginPage, mapDispatchToProps } from '../index';
import { changeToken } from '../actions';
import { checkToken } from '../../App/actions';

describe('<LoginPage />', () => {
  it('should render the wallets list', () => {
    const renderedComponent = shallow(
      <LoginPage loading error={false} wallets={[]} />
    );
    expect(renderedComponent.contains(<WalletsList loading error={false} wallets={[]} />)).toEqual(true);
  });

  it('should render fetch the wallets on mount if token is valid', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <LoginPage
          token="Not Empty"
          onChangeToken={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not call onSubmitForm if token is an empty string', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <LoginPage
          onChangeToken={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should not call onSubmitForm if token is null', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <LoginPage
          token=""
          onChangeToken={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeToken', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeToken).toBeDefined();
      });

      it('should dispatch changeToken when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const token = '14c71464e5d0323691q7c314b42eg04';
        result.onChangeToken({ target: { value: token } });
        expect(dispatch).toHaveBeenCalledWith(changeToken(token));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch checkToken when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(checkToken());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
