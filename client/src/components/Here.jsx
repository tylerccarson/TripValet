import React from 'react';

class Here extends React.Component {
  constructor(props){
    super(props);
    console.log("hello from Here.jsx");
  }

  render() {
    return (
      <div>
        <h1>Here I am</h1>
      </div>
    );
  }

}
export default Here;
