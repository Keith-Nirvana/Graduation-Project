import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectListPage from './pages/ProjectListPage';
import IntroductionPage from './pages/IntroductionPage';

import MainLayout from './components/MainLayout';

export class App extends React.Component {
  render() {
    return (
        <div>
          <Router>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>

            <Route path="/main" component={MainLayout}/>
          </Router>
        </div>
    );
  }
}

export default App;
