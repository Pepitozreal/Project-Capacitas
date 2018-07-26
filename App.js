import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  Button,
  Image
} from "react-native";
import CameraNew from "./Components/Camera.js";
import Storage from "./Providers/storage.js";
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Press to change"
    };
  }

  render() {
    text = this.state.text;
    number = this.state.number;
    return (
      <ViewPagerAndroid style={styles.viewPager}>
        <View style={styles.container}>
          <Text
            style={styles.text}
            onPress={() => {
              alert("Hej");
            }}
          >
            Click me
          </Text>
          <Text
            style={{ marginLeft: number, ...styles.text }}
            onPress={() => {
              this.setState({ text: "I changed!" });
            }}
          >
            {" "}
            {text}
          </Text>
        </View>

        <View style={styles.container}>
          <CameraNew />
        </View>

        <View style={styles.container2}>
        <Image style = {{width: 300, height: 500, borderWidth: 1, borderColor: 'black', backgroundColor:'red'}} source = {{uri:Storage.Image}}/>
          <View style={{ flexDirection: "row" }}>
            <Button title="Load" onPress={async () => {await Storage.loadImage(); this.forceUpdate()}} />
          </View>
        </View>
      </ViewPagerAndroid>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "white"
  },
  viewPager: {
    flex: 1
  }
};
