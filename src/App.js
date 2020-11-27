import React from 'react';
import List from "./component/list/List";
import Detail from './component/detail/Detail'

import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'

function App() {
    return (
        <Router className='App'>
            <Route exact path="/" component={List} />
            <Route path="/:id" component={Detail} />
        </Router>
    );
}

export default App;
