// import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import MailBoxView from './components/MailBoxViewer';
import Login from './components/Login';
import NotFound from './components/NotFound.jsx';
import ViewEmail from './components/MailViewer.jsx';
// import usePermanentDrawerLeft from './components/Drawer';
// import clippedDrawer from './components/Mailbox';

// credit: From secret sauce
const AuthenticatedRoute = ({children}) => {
  if (localStorage.getItem('user')) {
    return children;
  }
  return <Navigate to='/login' replace />;
};

const fetchMail = async (username, accessToken) => {
  const response = await fetch(
    `http://localhost:3010/v0/user?sendto=${encodeURIComponent(username)}`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    }
  );
  const data = await response.json();
  return data;
};

const putMail = async (mail, accessToken = undefined) => {
  if (!accessToken) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    accessToken = user ? user.accessToken : '';
  }

  await fetch(`http://localhost:3010/v0/user`, {
    method: 'put',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(mail),
  });
};

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const [mail, setMail] = useState([]);
  const [mailBoxView, setMailBoxView] = useState('inbox');
  const [mailBoxViewKey, setMailBoxViewKey] = useState('mailbox');
  const onViewChange = (key, value) => {
    setMailBoxViewKey(key.toLowerCase());
    setMailBoxView(value);
  };

  useEffect(() => {
    const asynFunc = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        return;
      }
      const username = user.name;
      const accessToken = user ? user.accessToken : '';
      const fetchedInfo = await fetchMail(username, accessToken);
      const sortedFetchedInfo = fetchedInfo.sort((a, b) => {
        return new Date(b.mail.received) - new Date(a.mail.received);
      });
      setMail(sortedFetchedInfo);
    };
    asynFunc();
  }, []);

  const updateAllEmails = () => {
    setMail([...mail]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <AuthenticatedRoute>
              <MailBoxView
                emails={mail}
                // onViewChange={onViewChange}
                putMail={putMail}
                updateAllEmails={updateAllEmails}
                mailBoxView={mailBoxView}
                mailBoxViewKey={mailBoxViewKey}
                onViewChange={onViewChange}
              />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/v0/user/:id'
          component={ViewEmail}
          element={
            <AuthenticatedRoute>
              <ViewEmail
                emails={mail}
                putMail={putMail}
                updateAllEmails={updateAllEmails}
                mailBoxView={mailBoxView}
              />
            </AuthenticatedRoute>
          }
        />

        <Route
          path='*'
          element={
            <AuthenticatedRoute>
              <NotFound />
            </AuthenticatedRoute>
          }
        />
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
