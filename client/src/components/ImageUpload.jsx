import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

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
      imagePreviewUrl: '',
      reader:''
    };
  }
  handleImageChange(e) {
    e.preventDefault();``
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
  };

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/images/upload', this.state.file)
      .catch((error) => {
        console.log('error', error);
      });
  }


  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={image} src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this.handleImageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
        </form>
        <div style={imgPreview}>
          {$imagePreview}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
