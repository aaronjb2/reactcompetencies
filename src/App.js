import React, { Component } from 'react';
import logo from './logo.svg';
import {Switch, HashRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './dux/store.js';
import Student from './Student.js';
import Teacher from './Teacher.js';
import './App.css';
import axios from 'axios';

class App extends Component {

  render() {
    return (
      <Provider store = {store}>
        <HashRouter>
          <div className="App">
            <Route exact path = '/' component={Student}/>
            <Route exact path = '/teacher' component={Teacher}/>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;


/*
CheckList:

01.create, manage, and sync with git
02.Make Arrow functions
03.import,export, and destructure
04.bind
05.use class based components
06.use props
07.render jsx and nested components
08.Use state,setState, and constructors
09.Use a functional component
10.Use a componentDidMount
11.Use axios
12.Use Hashbrowns
13.Use Link
14.Add reactRouter to code base
15.Use Switch and Route
16.Use Redux action builders
17.Use redux conect
18.create redux store
19.create node server
20.create static files
21.Create RESTFUL API
22.Delete Endpoint
23.Get Endpoint
24.Use params for endpoint
25.Post Endpoint
26.Put Endpoint
27.create restful queries
28.create restful status codes
29.store data in sessions
30.Use middleware request level
31.Use middleware top level
32.db alter table
33.db create table
34.db insert into table
35.db join
36.db select
37.db manipulate
38.massive connection
39.massive sql command
40.use many-many patterns
41.use one-many patterns
42.use one-one-patterns;
*/

