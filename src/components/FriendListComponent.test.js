import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FriendListComponent from './FriendListComponent';

const setup = () => {
  const utils = render(<FriendListComponent />);
  const input = utils.getByLabelText('Enter your friend name');
  //   console.log(utils.container);
  const friendlist = utils.container.querySelector('#friendList');
  console.log(friendlist);
  return {
    input,
    friendlist,
    ...utils,
  };
};

test('It render list on search', () => {
  const { input, friendlist } = setup();
  const friendName = 'Veronica';
  fireEvent.change(input, { target: { value: friendName } });
  console.log(friendlist.getElementsByTagName('li')[0]);
  expect(
    friendlist.getElementsByTagName('li')[0].getElementsByTagName('h4')[0]
  ).toHaveTextContent(friendName);
});
