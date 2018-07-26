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
export default class CameraModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      dimensions: Dimensions.get("screen")
    };
    Permissions.askAsync(Permissions.CAMERA).then(res => {
      this.setState({ hasCameraPermission: res.status === "granted" });
    });
    this.camera = null;
  }

  render() {
    text = this.state.text;
    number = this.state.number;
    hasPermission = this.state.hasCameraPermission;
    dimensions = this.state.dimensions;
    if (hasPermission) {
      return (
        <Camera
          style={{
            ...styles.camera,
            height: dimensions.height,
            width: dimensions.width
          }}
          type={Camera.Constants.Type.Back}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <TouchableHighlight
            style={{ ...styles.cameraButton, left: dimensions.width / 2 - 50 }}
            onPress={() => {
              this.camera
                .takePictureAsync({ quality: 0.9, base64: true })
                .then(data => { 
                  Storage.saveImage(data.base64)
                  //ALLT VI VILL GÖRA MED BILD
                });
            }}
          >
            <View />
          </TouchableHighlight>
        </Camera>
      );
    } else {
      return <Text>Yikes</Text>;
    }
  }
}

const styles = {
  cameraButton: {
    backgroundColor: "rgba(150,150,150,0.8)",
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 50
  }
};
