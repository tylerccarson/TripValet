import React from 'react';
import Header from '../components/Header.jsx';
import Main from '../components/Main.jsx';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

export default connect(mapStateToProps) (App);
