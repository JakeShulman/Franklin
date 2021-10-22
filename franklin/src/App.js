import { Container } from 'react-bootstrap';
import Home from './components/Home';
import './custom.scss';
import './index.css'
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
            <Router>
            <AuthProvider>
              <Switch>
                <Route exact path path="/" component={Home} />
                <PrivateRoute path='/dashboard' component={Dashboard}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
              </Switch>
            </AuthProvider>
            </Router>
    </>
  );
}

export default App;
 