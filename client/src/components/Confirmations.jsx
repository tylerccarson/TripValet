import React from 'react';
import Invitees from './Invitees.jsx';
import {List} from 'material-ui/List';

class Confirmations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: this.props.confirms
    };
  }

  componentDidMount() {
    this.props.socket.on('serverConfirmation', (data) => {
      let confirmations = this.state.confirmed;
      for (var i = 0; i < confirmations.length; i++) {
        if (confirmations[i].email === data.user.email) {
          //toggle value for the user that checked
          confirmations[i].confirmed = data.confirmed;
        }
      }
      //re-render with new default confirmation passed to list
      this.setState({
        confirmed: confirmations
      });
    });
  }

  render() {
    const style = {
      inviteList: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        height: '300px',
        width: '320px'
      }
    };

    return (
      <div>
        {/* added these 2 otherwise I can't click my button */}
        <br/>
        <br/>
      <List style={style.inviteList}>
        {this.state.confirmed.map((invitee, i) => {
          return <Invitees 
            key={i} 
            invitee={invitee} 
            user={this.props.user} 
            trip={this.props.trip}
            socket={this.props.socket}/>;
        })}
      </List>
      </div>
    );
  }

}

export default Confirmations;