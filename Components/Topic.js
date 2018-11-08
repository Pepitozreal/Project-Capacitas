import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  Button,
  Alert
} from "react-native";
import { Camera, Permissions } from "expo";
import Storage from "../Providers/storage.js";
import Scrubber from "./Scrubber.js";
import Ionicons from "@expo/vector-icons/Ionicons";

dim = Dimensions.get("screen");

export default class TopicView extends React.Component {
  scrubber;

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      isActive: this.props.isActive
    };
  }

  _shouldDelete() {
    Alert.alert(
      this.props.topic.name,
      "This will delete your topic and all pictures within it. Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => {
            this.props.topic.delete();
            this.props.onTopicDeleted();
          },
          style: "destructive"
        }
      ]
    );
  }

  componentWillReceiveProps(newProps) {
      if (this.state.isActive !== newProps.isActive ) {
          this.setState({isActive: newProps.isActive})
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Scrubber
          isActive = {this.state.isActive}
          ref={ref => (this.scrubber = ref)}
          images={this.props.topic.images}
        />

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"transparent"}
          style={{ position: "absolute", top: 30, right: 25, padding: 5 }}
          onPress={this._shouldDelete.bind(this)}
        >
          <Ionicons color="red" name="md-trash" size={28} />
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"transparent"}
          style={{
            position: "absolute",
            bottom: 65,
            left: 125,
            zIndex: 3,
            padding: 10
          }}
          onPress={() => {
            if (this.scrubber) this.scrubber.previous();
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={48}
            style={{ color: "white" }}
          />
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"transparent"}
          style={{
            position: "absolute",
            bottom: 65,
            left: 70,
            zIndex: 3,
            padding: 10
          }}
          onPress={() => {
            if (this.scrubber) this.scrubber.first();
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={48}
            style={{ color: "white" }}
          />
        </TouchableHighlight>

        <Ionicons
          name="ios-arrow-back"
          size={48}
          style={{
            color: "white",
            position: "absolute",
            bottom: 75,
            left: 70,
            zIndex: 2
          }}
        />

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"transparent"}
          style={{
            position: "absolute",
            bottom: 65,
            right: 125,
            zIndex: 3,
            padding: 10
          }}
          onPress={() => {
            if (this.scrubber) this.scrubber.next();
          }}
        >
          <Ionicons
            name="ios-arrow-forward"
            size={48}
            style={{ color: "white" }}
          />
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"transparent"}
          style={{
            position: "absolute",
            bottom: 65,
            right: 70,
            zIndex: 3,
            padding: 10
          }}
          onPress={() => {
            if (this.scrubber) this.scrubber.last();
          }}
        >
          <Ionicons
            name="ios-arrow-forward"
            size={48}
            style={{ color: "white" }}
          />
        </TouchableHighlight>

        <Ionicons
          name="ios-arrow-forward"
          size={48}
          style={{
            color: "white",
            position: "absolute",
            bottom: 75,
            right: 70,
            zIndex: 2
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 30,
            left: 25,
            paddingRight: 75,
            borderBottomWidth: 1,
            borderColor: "#fff"
          }}
        >
          <Text style={{ fontSize: 28, color: "#fff" }}>
            {" "}
            {this.props.topic.name}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    height: dim.height,
    width: dim.width,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  }
};
