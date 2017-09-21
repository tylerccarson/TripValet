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
        height: '100%',
        width: '100%'
      },
      list: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        padding: '0px'
      },
      invite: {
        width: '100%',
        paddingRight: '15px'
      },
      leave: {
        width: '100%',
        margin: '0px',
        padding: '0px'
      }
    };

    return (
      <div style={style.confirmations}>
        
        <div id="confirmrow1" className="row">
          <h2 className="col-lg-12" style={{margin: '0px', width: '100%'}}>Members</h2>
        </div>
        <div id="confirmrow2" className="row" style={{paddingLeft: '15px', paddingRight: '15px'}}>
          <List style={style.list}>
            {this.state.confirms.filter((invitee)=>{return invitee.email.length>0}).map((invitee, i) => {
              console.log("CONFIRM: ", invitee);
              return <Invitees 
                key={i} 
                invitee={invitee} 
                user={this.props.user} 
                trip={this.props.trip}
                socket={this.props.socket}/>;
            })}
          </List>
        </div>
        
        <div style={style.leave} className="row">
          <div className="col-lg-12" style={{padding: '0px'}}>
            <FlatButton 
            secondary={true}
            label="Leave Trip" 
            fullWidth={true}
            key='submit'
            onClick={this.leaveTrip} />  
          </div>
          
        </div>
        <div style={style.invite}>
          <form>
            <FormGroup>
              <ControlLabel>Invite a friend</ControlLabel>
              <InputGroup style={{width: '100%' }}>
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

      </div>
    );
  }

}

export default Confirmations;