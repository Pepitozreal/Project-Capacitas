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
} from "react-native";
import { Camera, Permissions } from "expo";
import Storage from "../Providers/storage.js";
import Topic from "../Classes/Topic.js";


dim = Dimensions.get("screen")
export default class CreateTopic extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
          text: ""
      };
    }


    createTopic = () => {
        if (this.state.text.length == 0) {
            alert("Must provide a name!")
            return;
        }
        topic = new Topic(this.state.text)
        topic.create();
        if (this.props.onTopicCreated) {
            this.props.onTopicCreated(topic);
        }
    }

    render() {
      return (

          <View style={styles.container}>
            <Text fontSize = {20}> Create a new topic! </Text>
            <TextInput style = {styles.input}
                value={this.state.text}
                clearTextOnFocus = {true}
                allowFontScaling = {true}
                placeholder = {"Topic name"}
                maxLength = {50}
                onChangeText = {(text) => {
                    this.setState({text})
                }}
                onSubmitEditing = {this.createTopic}
                />
            <Button 
                title = {"create topic!"}
                onPress = {this.createTopic}/>
          </View>

      );
    }
  }

  const styles = {
      container: {
        flex: 1,
        width: dim.width,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      },
      input: {
          height: 50, 
          width: 300,
          fontSize: 20
      }
  }