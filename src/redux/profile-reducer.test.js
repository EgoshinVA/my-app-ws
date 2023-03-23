import profileReducer, { addPostActionCreator } from './profile-reducer';

it('new post should be added', () => {
  //1.test data
  let action = addPostActionCreator('react');
  let state = {
    postData: [
      { id: '1', desc: 'Hi! How are you?', likes: '2' },
      { id: '2', desc: "It's my first project!", likes: '5' },
      { id: '3', desc: 'Hey', likes: '1' },
    ],
  };
  //2.action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.postData.length).toBe(4);
});
