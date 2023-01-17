import React, { Component } from 'react';

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor":"black"}}>
                    <div className="container">
                    <a className="navbar-brand" href="/">To Do App</a>
                    </div>
          </nav>
            </React.Fragment>
        );
    }
}
 
export default NavBar;