import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from './components/DashBoard.jsx';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <DasBboard />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
