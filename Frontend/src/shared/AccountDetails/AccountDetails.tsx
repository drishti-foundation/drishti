import React, { useContext } from 'react';

import AuthContext from '#feathers/AuthContext';
import { logout as _logout } from '#feathers/auth';

interface AccountDetails {
  close: () => void;
}

function AccountDetails({ close }: AccountDetails) {
  const auth = useContext(AuthContext);

  const logout = async () => {
    if (await _logout()) {
      auth.set({
        loggedIn: false,
        username: null,
      });
    } else {
      alert('Failed to logout.');
    }
    close();
  };

  console.log(auth);

  return (
    <div className="account-wrapper" onClick={close}>
      <div className="account-details" onClick={e => e.stopPropagation()}>
        <p className="name">{auth.username}</p>
        <hr />
        <a
          onClick={() => alert('TODO: implement change password')}
          href="/"
          className="change-password"
        >
          Change Password
        </a>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
