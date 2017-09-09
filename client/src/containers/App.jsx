import React from 'react';
import Header from '../components/Header.jsx';
import Main from '../components/Main.jsx';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

class App extends React.Component {
  constructor(){
    super();


  }

  logout () {
    window.location.reload();

  }
  render () {
    return (
      <div>
        <Header
          logout={this.logout.bind(this)}
        />
        <Main />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gifs: state.gifs
});

export default withRouter(connect(mapStateToProps)(App));
// export default App
