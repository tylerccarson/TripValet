import React from 'react';
import Invitees from './Invitees.jsx';
import {List} from 'material-ui/List';
import axios from 'axios';
import { FormGroup, InputGroup, FormControl, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';

class Confirmations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirms: this.props.confirms,
      email: ''
    };
    this.subscribeToConfirmations = this.subscribeToConfirmations.bind(this);
    this.onChange = this.onChange.bind(this);
    this.inviteNewUser = this.inviteNewUser.bind(this);
    this.leaveTrip = this.leaveTrip.bind(this);
  }

  componentDidMount() {
    this.subscribeToConfirmations();
  }

  subscribeToConfirmations() {
    this.props.socket.on('serverConfirmation', (data) => {
      let confirmations = this.state.confirmed;
      for (var i = 0; i < confirmations.length; i++) {
        if (confirmations[i].email === data.user.email) {
          confirmations[i].confirmed = data.confirmed;
        }
      }

      this.setState({
        confirms: confirmations
      });
    });
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  inviteNewUser(email) {
    axios.post('/trips/invite', {
      invitee: this.state.email,
      trip: this.props.trip,
      inviter: this.props.user
    })
      .then((invited) => {
        let confirmations = this.state.confirms;
        confirmations.push(invited.data);
        this.setState({
          confirms: confirmations,
          email: ''
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          email: ''
        });
      });
  }

  leaveTrip() {
    if (confirm('Are you sure you want to leave the trip?') === true) {
      axios.post('/confirmed/delete', {
        user: this.props.user,
        trip: this.props.trip
      })
        .then((deleted) => {
          window.location = '/';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  render() {

    const style = {
      confirmations: {
        height: '400px',
        width: '320px'
      },
      list: {
        height: '250px',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll'
      },
      invite: {
        width: '100%'
      },
      leave: {

      }
    };

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div style={style.confirmations}>
          <List style={style.list}>
            {this.state.confirms.map((invitee, i) => {
              return <Invitees 
                key={i} 
                invitee={invitee} 
                user={this.props.user} 
                trip={this.props.trip}
                socket={this.props.socket}/>;
            })}
          </List>
          <div style={style.invite}>
            <form>
              <FormGroup>
                <ControlLabel>Invite a friend</ControlLabel>
                <InputGroup>
                  <FormControl
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Who's coming with?"
                  />
                  <FlatButton
                    primary={true}
                    label="Add invite"
                    fullWidth={true}
                    key="submit"
                    onClick={this.inviteNewUser} />
                </InputGroup>
              </FormGroup>
            </form>
          </div>
          <div style={style.leave}>
            <FlatButton 
              secondary={true}
              label="Leave Trip" 
              fullWidth={true}
              key='submit'
              onClick={this.leaveTrip} />
          </div>
        </div>
      </div>
    );
  }

}

export default Confirmations;