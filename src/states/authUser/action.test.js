/**
 * Skenario authUserAction
 *
 * a. asyncSetAuthUser
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 * b. asyncUnsetAuthUser
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 * c. asyncRegisterUserAction
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncRegisterUserAction, asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserAction,
} from './action';

const fakeLoginResponse = JSON.parse('{"status":"success","message":"user logged in","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItRHo2RVduYlNFTGxaV1hfWiIsImlhdCI6MTY3NzY1MTkxNX0.osQKwv-hJrv166iBEWtfx4GCPYE8Al5MUM7GTRJlkHA"}}').data.token;

const fakeGetOwnProfileResponse = JSON.parse('{"status":"success","message":"user retrieved","data":{"user":{"id":"user-Dz6EWnbSELlZWX_Z","name":"timbrin","email":"timbrin@gmail.com","avatar":"https://ui-avatars.com/api/?name=timbrin&background=random"}}}').data.user;

const fakeRegisterResponse = JSON.parse('{"status":"success","message":"user created","data":{"user":{"id":"user-DjbdUBnJasJbkdY","name":"lorem","email":"lorem@gmail.com","avatar":"https://ui-avatars.com/api/?name=lorem&background=random"}}}').data.user;

const fakeErrorResponse = new Error('Oops, Something went wrong!');

/**
 * a. asyncSetAuthUser
 */

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementation
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup
    delete api._login;
    delete api._getOwnProfile;
  });

  /**
   * Skenario 1
   */
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse);

    // mock dispatch
    const dispatch = jest.fn();
    api.putAccessToken = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'lorem123@email.com', password: 'lorem123' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserAction(fakeGetOwnProfileResponse));
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  /**
   * Skenario 2
   */
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'lorem123@email.com', password: 'lorem123' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

/**
 * B. asyncUnsetAuthUser
 */
describe('asyncUnsetAuthUser thunk', () => {
  /**
   * Skenario 1
   */
  it('should dispatch action correctly when data fetching success', async () => {
    // mock dispatch
    const dispatch = jest.fn();
    api.putAccessToken = jest.fn();

    // action
    await asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserAction(null));
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  /**
   * Skenario 2
   */
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'lorem123@email.com', password: 'lorem123' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

/**
 * C. asyncRegisterUser
 */
describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._register = api.register;
  });

  afterEach(() => {
    // restore original implementation
    api.register = api._register;

    // delete backup
    delete api._register;
  });

  /**
   * Skenario 1
   */
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncRegisterUserAction({
      email: 'lorem123@gmail.com',
      name: 'lorem',
      password: 'lorem123',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  /**
   * Skenario 2
   */
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncRegisterUserAction({
      email: 'lorem@gmail.com',
      name: 'lorem',
      password: 'lorem',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
