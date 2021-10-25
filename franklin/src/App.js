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
import Upload from './components/Upload';
import WriteBoard from './components/WriteBoard';

function App() {
  return (
    <>
            <Router>
            <AuthProvider>
              <Switch>
                <Route exact path path="/" component={Home} />
                <PrivateRoute path='/upload' component={Upload}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/write" component={WriteBoard}/>
              </Switch>
            </AuthProvider>
            </Router>
    </>
  );
}

export default App;
 