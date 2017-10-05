import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { Form, FormControl, FormGroup, ControlLabel, Carousel} from 'react-bootstrap';

var imgPreview = {
  textAlign: 'center',
  margin: '5px 15px',
  height: '200px',
  width: '300px',
  borderLeft: '1px solid gray',
  borderRight: '1px solid gray',
  borderTop: '5px solid gray',
  borderBottom: '5px solid gray'
};
const image = {
  width: '100%',
  height: '100%'
};
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: 'asdf',
      open: false,
      reader: '',
      imageUrls: []
    };
    
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FormData();
    reader.append('File', e.target.files[0]);
    reader.append('trip_id', this.props.trip.id);
    reader.append('user_id', this.props.user.id);
    reader.append('poster', this.props.user.display);
    this.setState({
      file: reader,
      imagePreviewUrl: reader.result,
      reader: reader
    });
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleTouchTap();
    axios.post('/images/upload', this.state.file)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  componentDidMount() {
    axios.get('/images/getAllImages', {
      params: {
        trip_Id: this.props.trip.id
      }
    })
      .then((images)=> {
        let imgUrls = images.data.map( image => {
          return image.url;
        } );
        this.setState({
          imageUrls: imgUrls
        });
      });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }


  render() {
    return (
      <div className="previewComponent">
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Title</ControlLabel>
            {' '}
            <FormControl
              type="text"
              placeholder="Jane Doe"
            />
          </FormGroup>

          <FormGroup controlId="image">
            <ControlLabel>Image</ControlLabel>
            <input
              className="fileInput"
              type="file"
              onChange={(e)=>this.handleImageChange(e)}
            />
          </FormGroup>

          <RaisedButton
            className="submitButton"
            type="submit"
            onClick={(e)=>this.handleSubmit(e)}
            label="Upload Image"
          />

          <Snackbar
            open={this.state.open}
            message="Image successfully uploaded"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </Form>
        <Carousel>
          {this.state.imageUrls.map((url) => {
            return (
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src={url}/>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default ImageUpload;
