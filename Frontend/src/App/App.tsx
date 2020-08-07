import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { login } from '#feathers/auth';
import AuthContext, { defaultAuth } from '#feathers/AuthContext';

import useState from './useState';
import Home from './Home';
import About from './About';

import '#styles/App.scss';

function App() {
  const [auth, setAuth] = useState(defaultAuth);

  useEffect(() => {
    login().then(username => {
      setAuth({
        loading: false,
        loggedIn: username !== null,
        username,
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <div className="app">
        <Switch>
          <Route path="/demo" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/" component={About} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
