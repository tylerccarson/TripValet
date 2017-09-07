import React from 'react';
var gifStyle = {
  height: '200px',
  width: '200px'
};
const GifsTemp = ({gifs}) => {
  const gifItems = gifs.map((gif) => {
    return (
      <li key={gif.id}><iframe style={gifStyle} src={gif.url} /></li>
    );
  });

  return (
    <ul>{gifItems}</ul>
  );
};

export default GifsTemp;
