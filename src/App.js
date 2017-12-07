import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Header from './components/common/header';
import Footer from './components/common/footer';
import Main from './components/homePage';
import SingleShowInfo from './components/singleShowInfo';
import ShowList from './components/showList';

class App extends Component {
  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Redirect exact from  = "/" to ="shows"/>  
          <Route exact path="/shows" component={Main} />
          <Route path="/shows/:id" component={SingleShowInfo} />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;