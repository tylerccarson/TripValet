import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import mapHelper from './mapHelper.js';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';
import Info from './Info.jsx';
import $ from 'jquery';
import ReactDOM from 'react-dom';


const mapStyleInner = {
  width: "calc(100%-15px)",
  height: '500px',
  paddingRight: '15px'

};


const initialCenter = !navigator.geolocation ? {lat: 37.773972, lng: -122.431297} : '';

const categories = mapHelper.categoriesToString();

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      center: {lat: 37.773972, lng: -122.431297},
      points: [],
      fsId: '',
      fsSecret: '',
      categories: categories,
      suggestions: []
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.addressArrayToString = this.addressArrayToString.bind(this);
    this.moveCenter = this.moveCenter.bind(this);
    this.findPointsNearBy = this.findPointsNearBy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchHandle = this.searchHandle.bind(this);
    this.renderInfo= this.renderInfo.bind(this);
  }

  onMarkerClick(props, marker, e) {
    axios.get(`https://api.foursquare.com/v2/venues/${props.info.id}`, {
      params: {
        client_id: this.state.fsId,
        client_secret: this.state.fsSecret,
        v: 20170916
      }
    })
      .then((response)=>{
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        }, ()=>{
          this.renderInfo();
        });
      })
      .catch((err)=>{
        console.log('Error: ', err);
      });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  renderInfo() { // DO NOT REVMOVE COMMENT = This is done to fix broken npm map package. See https://github.com/fullstackreact/google-maps-react/issues/70
    ReactDOM.render(
      <Info 
        place={this.state.selectedPlace} 
        addressArrayToString={this.addressArrayToString} 
        infoClick={this.props.addToSchedule}
        schedule={this.props.schedule}
      />
      , document.getElementById('info2')
    ); 
  }

  addressArrayToString(arr) {
    return arr.map((line, index)=>{
      return <text key={index} >{line}<br/></text>;
    });
  }

  moveCenter(mapProps, map) {
    this.setState({
      center: {lat: map.center.lat(), lng: map.center.lng()}
    }, ()=>{
      this.findPointsNearBy();
    });
  }

  findPointsNearBy() {
    axios.get('https://api.foursquare.com/v2/venues/search', {
      params: {
        client_id: this.state.fsId,
        client_secret: this.state.fsSecret,
        ll: `${this.state.center.lat},${this.state.center.lng}`,
        radius: 5000,
        v: 20170915,
        locale: 'en_us',
        categoryId: this.state.categories
      }
    })
      .then((response)=>{
        this.setState({points: response.data.response.venues});
      });
  }

  searchHandle(e) {
    this.setState({
      'searchbox': e.target.value
    });
  }

  handleSubmit(e) {

    if (e.keyCode === 13) {
      this.geocoder = new this.props.google.maps.Geocoder();
      this.geocoder.geocode({address: this.state.searchbox}, (response, status)=>{
        if (status === this.props.google.maps.GeocoderStatus.OK) {
          console.log('Success!');
          this.setState({
            center: {
              lat: response[0].geometry.location.lat(),
              lng: response[0].geometry.location.lng()
            }
          }, ()=>{
            this.findPointsNearBy();
          });
        } else {
          console.log('ERROR');
        }
      });
    }
  }

  componentDidMount() {
    axios.get('/api/foursquare')
      .then((response)=>{
        this.setState({
          fsId: response.data.clientId,
          fsSecret: response.data.clientSecret
        });
      })
      .then(()=>{
        this.findPointsNearBy();
        $($('#beforemap').children()[0].childNodes[0]).css({'position': 'relative'});
      
      });



  }

  render() {
    return (

      <Map
        id="mapinner"
        google={this.props.google} 
        zoom={13} 
        style = {mapStyleInner} 
        onClick={this.onMapClicked}
        onDragend={this.moveCenter}
        center={this.state.center}
        clickableIcons={true}
      >
        {this.state.points.map((point)=>{
          return <Marker
            key={point.id} 
            onClick={this.onMarkerClick}
            name={'Current location'}
            position={{lat: point.location.lat, lng: point.location.lng}}
            info={point}           
          />;
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div id="info2"></div>
            
        </InfoWindow>
        <FormGroup style={{'zIndex': 300, position: 'relative', left: '113px', 'paddingTop': '8px', 'width': '172px', 'margin': '0px'}}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search City"
              name="searchbox"
              value={this.state.searchbox}
              onChange={this.searchHandle}
              onKeyUp={this.handleSubmit}
            />
          </InputGroup>
        </FormGroup>
          
      </Map>


    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBltPUIFN_TATbG_Ofpba3cjwvLTbo2TeQ'
})(MapContainer);

