import {
  CHANGE_TOKEN,
} from '../constants';

import {
  changeToken,
} from '../actions';

describe('Login Actions', () => {
  describe('changeToken', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = '14c71464e5d0323691q7c314b42eg04';
      const expectedResult = {
        type: CHANGE_TOKEN,
        token: fixture,
      };

      expect(changeToken(fixture)).toEqual(expectedResult);
    });
  });
});
