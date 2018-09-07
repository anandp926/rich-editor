import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './ory/ory-editor/'
import HtmlRender from './ory/html-render'
import{ Route, Switch, Link} from 'react-router-dom'


class App extends Component {
  state = {
    flag: 0
  }
  showEComponent = () => {
    this.setState({flag:1})
  }
  showHComponent = () => {
    this.setState({flag:0})
  }

  render() {
    return (
      <div>
        <div className="float-button">
          <Link to='/'>
            <button >editor</button>
          </Link>
        </div>
        {
          this.state.flag === 1
          ? <Editor/>
          : <HtmlRender/>
        }
        <Switch>
          <Route path="/" exact render={({match})=>(
            <Editor match={match}/>
          )}/>
          <Route path="/:id" exact Component={HtmlRender} render={({match})=>(
            <HtmlRender match={match}/>
          )}/>
        </Switch>
        
      </div>
    );
  }
}

export default App;
