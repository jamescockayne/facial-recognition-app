import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'c007e471b8af4559b776fc9aee35317b'
 });

const particleParams = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      },
    },

    line_linked: {
      shadow: {
        enable: true,
        color: "#ffffff",
        blur: 10
      },
      width : 1
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log);
  }

  onInputChange = (event) => {  
    this.setState({input: event.target.value});
  }

  onButtonPress = () => {
    console.log('click');
    this.setState({imageURL: this.state.input});

    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => generalModel.predict(this.state.input))
      .then(response => this.drawBox(this.locateFace(response)))
      .catch(err => console.log(`there was an error: ${err}`))  
  }

  locateFace = (data) => {
    const boundingInfo = data.outputs[0].data.regions[0].region_info.bounding_box;
    const userImage = document.getElementById('user-image');
    const width = Number(userImage.width);
    const height = Number(userImage.height);
    console.log(boundingInfo, width, height);

    return {
      left: boundingInfo.left_col * width,
      top: boundingInfo.top_row * height,
      right: width - (boundingInfo.right_col * width),
      bottom: height - (boundingInfo.bottom_row * height),
    }
  }

  drawBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  changeRoute = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
      
      <Particles params={particleParams} className='particles'/>
      

      
        { this.state.route === 'home' 
          ? <div>
              <Navigation changeRoute={this.changeRoute}/>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/>
              <FaceRecognition box={this.state.box} image={this.state.imageURL}/>
            </div>
          : (
            this.state.route === 'register'
            ? <Register changeRoute={this.changeRoute}/>
            : <SignIn changeRoute={this.changeRoute}/>
          )
         }

 
      </div>
      
    );
  }
  
}

export default App;