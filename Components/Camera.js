import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { Camera, Permissions } from "expo";
import Storage from "../Providers/storage.js";

import { ImageManipulator } from "expo";
import { Ionicons } from '@expo/vector-icons';

export default class CameraModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      dimensions: Dimensions.get("screen"),
      ratio: 0,
      ratioString: "4:3",
      transparent: true
    };
    Permissions.askAsync(Permissions.CAMERA).then(res => {
      this.setState({ hasCameraPermission: res.status === "granted" });
    });
    this.camera = null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.ratio !== nextState.ratio) return true;
    if (this.state.ratioString !== nextState.ratioString) return true;
    if (this.state.type !== nextState.type) return true;
    if (this.state.hasCameraPermission !== nextState.hasCameraPermission)
      return true;
    if (this.state.dimensions !== nextState.Dimensions) return true;
    if (this.state.transparent !== nextState.transparent) return true;
    return false;
  }

  snap() {
    this.camera
    .takePictureAsync({ quality: 0.5, base64: false })
    .then(async data => {
      if (this.state.type === Camera.Constants.Type.front) {
        scale = data.height/dim.height;
        croppedWidth = dim.width * scale
        data = await ImageManipulator.manipulate(
          data.uri,
          
            [
              {flip: {horizontal: true}},
              {crop: {
                originX: 0,
                originY: 0,
                width: croppedWidth,
                height: data.height
              }}
            ],
          {
            compress: 1,
            format: "png",
            base64: false
          }
        );
      }
      Storage.saveImage(data, this.props.topic);
      this.props.onPictureTaken();
      
      //ALLT VI VILL GÖRA MED BILD
    });
  }

  toggleType() {
    this.setState({type: this.state.type === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front})
  }

  toggleTransparent() {
    this.setState({transparent: !this.state.transparent})
  }

  render() {
    text = this.state.text;
    number = this.state.number;
    hasPermission = this.state.hasCameraPermission;
    dimensions = this.state.dimensions;
    if (hasPermission) {
      return (
        <View>
        <Camera
          opacity = {this.state.transparent ? 0.7 : 1}
          style={{
            height: dimensions.height,
            width: dimensions.height * this.state.ratio
          }}
          ratio={this.state.ratioString}
          type={this.state.type}
          ref={async ref => {
            if (!ref) return;
            this.camera = ref;
            if (this.state.ratio !== 0) return;
            ratios = await ref.getSupportedRatiosAsync();
            r = ratios.map(ratio => {
              rv = ratio.split(":");
              return parseInt(rv[0]) / parseInt(rv[1]);
            });
            this.setState({ ratio: 1 / r[1], ratioString: ratios[1] });
          }}
        >
        </Camera>
        <TouchableHighlight
            activeOpacity = {0.5}
            underlayColor = {"transparent"}
            style = {{
              position: "absolute",
              bottom: 50,
              left: dimensions.width / 2 - 50
            }}
            onPress={this.snap.bind(this)}
          >
            <View 
              style={{ ...styles.cameraButton, borderRadius: dimensions.width/2, borderWidth: 8, backgroundColor: "transparent", borderColor: "#fff" }}/>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity = {0.5}
            underlayColor = {"transparent"}
            style = {{
              position: "absolute",
              top: 150,
              left: dim.width - 40
            }}
            onPress={this.toggleType.bind(this)}
          >
            <Ionicons 
              name = "md-swap"
              size = {32}
              color = {"#fff"}/>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity = {0.5}
            underlayColor = {"transparent"}
            style = {{
              position: "absolute",
              top: 200,
              left: dim.width - 40
            }}
            onPress={this.toggleTransparent.bind(this)}
          >
            <Ionicons 
              name = {this.state.transparent ? "md-square-outline" : "md-square"}
              size = {32}
              color = {"#fff"}/>
          </TouchableHighlight>
        </View>

        
      
      );
    } else {
      return <Text>Yikes</Text>;
    }
  }
}

const styles = {
  cameraButton: {
    width: 100,
    height: 100,
    
  }
};
