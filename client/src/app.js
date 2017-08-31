import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/DashBoard.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <Dashboard />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
