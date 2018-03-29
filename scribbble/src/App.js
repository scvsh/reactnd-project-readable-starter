import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import PostDetail from './components/PostDetail.js';
import PostDashboard from './components/PostDashboard.js';
import NotFound from './components/NotFound.js';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={PostDashboard} />
                    <Route exact path="/:category" component={PostDashboard} />
                    <Route exact path="/:category/:id" component={PostDetail} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
