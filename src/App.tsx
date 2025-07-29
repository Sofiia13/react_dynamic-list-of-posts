// import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';
// import { Post } from './types/Post';
// import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Unable to load users');
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  ''
                )}

                {errorMessage ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* //{' '}
              <div className="block" data-cy="MainContent">
                // <p data-cy="NoSelectedUser">No user selected</p> */}
              {/* <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>

              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div> */}
              {selectedUser && (
                <PostsList
                  selectedUser={selectedUser}
                  setErrorMessage={setErrorMessage}
                />
              )}
            </div>
          </div>
        </div>

        {/* <div
          data-cy="Sidebar"
          className={classNames(
            'tile',
            'is-parent',
            'is-8-desktop',
            'Sidebar',
            'Sidebar--open',
          )}
        >
          <div className="tile is-child box is-success ">
            <PostDetails />
          </div>
        </div> */}
      </div>
      {/* </div> */}
    </main>
  );
};
