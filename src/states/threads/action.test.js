/**
 * Skenario Test Users and Threads Action
 *
 * A. asyncUserAndThreads
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setThreads, asyncUserAndThreads } from './action';
import { setUsers } from '../users/action';

const fakeThreadsResponse = [
  {
    body: '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dum…ext of the printing and typesetting industry.</p>',
    category: 'lorem',
    createdAt: '2023-03-01T05:06:18.685Z',
    downVotesBy: [],
    id: 'thread-EtRM-DLppDV6oU45',
    ownerId: 'user-Dz6EWnbSELlZWX_Z',
    title: 'lorem ipsum',
    totalComments: 0,
    upVotesBy: [],
  },
  {
    body: '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>',
    category: 'lorem ipsum',
    createdAt: '2023-03-02T03:04:20.675Z',
    downVotesBy: [],
    id: 'thread-EpPDYN8OhfpZcUSj',
    ownerId: 'user-Dz6EWnbSELlZWX_Z',
    title: 'Lorem',
    totalComments: 0,
    upVotesBy: [],
  },
];

const fakeUsersResponse = [
  {
    id: 'user-Dz6EWnbSELlZWX_Z',
    name: 'timbrin',
    email: 'timbrin@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=timbrin&background=random',
  },
];

const fakeErrorResponse = new Error('Opps, something went wrong!');

/**
 * A. asyncUserAndThreads
 */
describe('asyncUserAndThreads thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncUserAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setUsers(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(setThreads(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncUserAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
