import React, { Component } from 'react';
import {Route ,Navigate , Routes} from 'react-router-dom';
import "./App.css";
import NavBar from './components/navbar';
import Main from './components/mainpage';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <React.Fragment>
          <NavBar />
          <Routes>
            <Route path="/main" element={<Main/>}/>
            <Route path="/" element={<Navigate replace to="/main" />}/>
          </Routes>
      </React.Fragment>
    );
  }
}
 
export default App;