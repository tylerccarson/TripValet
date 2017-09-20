var categories = {
  Amphitheater: '56aa371be4b08b9a8d5734db',
  Aquarium: '4fceea171983d5d06c3e9823',
  Art_Gallery: '4bf58dd8d48988d1e2931735',
  Circus: '52e81612bcbc57f1066b79e7',
  Exhibit: '56aa371be4b08b9a8d573532',
  Historic_Site: '4deefb944765f83613cdba6e',
  Memorial_Site: '5642206c498e4bfca532186c',
  Museum: '4bf58dd8d48988d181941735',
  Opera_House: '4bf58dd8d48988d136941735',
  Theater: '4bf58dd8d48988d137941735',
  Public_Art: '507c8c4091d498d9fc8c67a9',
  Theme_Park: '4bf58dd8d48988d182941735',
  Tour_Provider: '56aa371be4b08b9a8d573520',
  Water_Park: '4bf58dd8d48988d193941735',
  Zoo: '4bf58dd8d48988d17b941735',
  Festival: '5267e4d9e4b0ec79466e48c7',
  Music_Festival: '5267e4d9e4b0ec79466e48d1',
  Parade: '52741d85e4b0d5d1e3c6a6d9',
  Street_Fair: '5267e4d8e4b0ec79466e48c5',
  Bay: '56aa371be4b08b9a8d573544',
  Beach: '4bf58dd8d48988d1e2941735',
  Botanical_Garden: '52e81612bcbc57f1066b7a22',
  Bridge: '4bf58dd8d48988d1df941735',
  Castle: '50aaa49e4b90af0d42d5de11',
  Fountain: '56aa371be4b08b9a8d573547',
  Harbor_Marina: '4bf58dd8d48988d1e0941735',
  Hot_Spring: '4bf58dd8d48988d160941735',
  Lighthouse: '4bf58dd8d48988d15d941735',
  National_Park: '52e81612bcbc57f1066b7a21',
  Palace: '52e81612bcbc57f1066b7a14',
  Plaza: '4bf58dd8d48988d164941735',
  Scenic_Lookout: '4bf58dd8d48988d165941735',
  Ski_Area: '4bf58dd8d48988d1e9941735',
  Vineyard: '4bf58dd8d48988d1de941735',
  Monument_Landmark: '4bf58dd8d48988d12d941735',
  Observatory: '5744ccdfe4b0c0459246b4d9',
  Spiritual_Center: '4bf58dd8d48988d131941735',
  Tourist_Information_Center: '4f4530164b9074f6e4fb00ff'
};

module.exports.key = () => {

  console.log('Environment: ', process);
  var config = require('../../../config/development.json');
};


module.exports.categoriesToString = ()=> {
  let stringArr = [];
  for (var x in categories) {
    stringArr.push(categories[x]);
  }
  return stringArr.join(',');
};