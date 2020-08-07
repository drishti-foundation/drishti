import React, { useState, useContext } from 'react';

import { login, signup } from '#feathers/auth';
import AuthContext from '#feathers/AuthContext';
import LoadingSpinner from '#shared/LoadingSpinner';

const otpTitle = `\
Due to limited translation capabilities, Hindi Braille has been limited to select NGOs.
English Braille is available for everyone regardless if you have an account or not.
If you want Hindi Braille, contact us at mail.drishtifoundation@gmail.com.`;

enum Pages {
  Login = 'Login',
  SignUp = 'Sign Up',
}

interface LoginOrSignUpProps {
  close: () => void;
}

function LoginOrSignUp({ close: closeModal }: LoginOrSignUpProps) {
  const [page, setPage] = useState(Pages.Login);
  const [lusername, setLusername] = useState('');
  const [lpassword, setLpassword] = useState('');
  const [susername, setSusername] = useState('');
  const [spassword, setSpassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const auth = useContext(AuthContext);

  const isLogin = page === Pages.Login;

  const isDisabled =
    auth.loading || isLogin
      ? (lusername.trim().length && lpassword.trim().length) === 0
      : (susername.trim().length && spassword.trim().length && otp.trim().length) === 0;

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    auth.set({ loading: true });
    let loggedIn = false;
    let username: string | null;
    if (isLogin) {
      username = await login({ username: lusername, password: lpassword });
      loggedIn = username !== null;
    } else {
      username = susername;
      loggedIn = await signup({ username: susername, password: spassword }, otp);
    }
    auth.set({ loading: false, username, loggedIn });
    if (loggedIn) {
      closeModal();
    } else {
      alert('Failed to log in');
    }
  };

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const tabHandler = (page: Pages) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (page === Pages.Login) {
      setTimeout(() => setShowOtp(false), 399);
    } else {
      setShowOtp(true);
    }
    setTimeout(() => setPage(page));
  };

  const close = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="form-wrapper">
      <form about={`${page} Form`} onSubmit={handleSubmit} className="form">
        <div className="tab-bar">
          <button onClick={tabHandler(Pages.Login)} className={isLogin ? 'sel' : undefined}>
            Login
          </button>
          <button onClick={tabHandler(Pages.SignUp)} className={isLogin ? undefined : 'sel'}>
            Sign Up
          </button>
          <button onClick={close} className="close">
            ×
          </button>
          <span
            className="highlight"
            style={{
              width: isLogin ? '4ch' : '6ch',
              transform: `translateX(${isLogin ? '0' : '7'}ch)`,
            }}
          ></span>
        </div>
        <h3>{page}</h3>
        <label htmlFor="username" placeholder="Username">
          Username
        </label>
        <input
          title="Username"
          name="username"
          id="username"
          placeholder="Username"
          type="text"
          value={isLogin ? lusername : susername}
          onChange={e => (isLogin ? setLusername(e.target.value) : setSusername(e.target.value))}
          required
        />
        <div className="password">
          <label htmlFor="password">Password</label>
          <button onClick={togglePassword}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <input
          title="Password"
          name="password"
          placeholder="Password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={isLogin ? lpassword : spassword}
          onChange={e => (isLogin ? setLpassword(e.target.value) : setSpassword(e.target.value))}
          autoCapitalize="false"
          autoComplete="false"
          autoCorrect="false"
          autoSave="false"
          required
        />
        {showOtp && (
          <div className={`otp -${isLogin ? 'backward' : 'forward'}`}>
            <label htmlFor="otp" placeholder="OTP">
              OTP
              <span title={otpTitle} className="question">
                ?
              </span>
            </label>
            <input
              title="OTP"
              name="otp"
              id="otp"
              placeholder="OTP"
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <button className="btn" type="submit" disabled={isDisabled}>
          {auth.loading ? <LoadingSpinner /> : page}
        </button>
      </form>
    </div>
  );
}

export default LoginOrSignUp;
