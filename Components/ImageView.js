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
  FlatList,
  Image
} from "react-native";
import { Camera, Permissions } from "expo";
import Storage from "../Providers/storage.js";

dim = Dimensions.get("screen")

export default class Scrubber extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
          visible: 0
      };
    
      
    }


    setVisible() {
        this.setState({visible:1})
    }
    
    setInvisible() {
        this.setState({visible:0})
    }

    render() {
      return (
        
        <Image
                source = {{uri: this.props.uri}}
                style = {
                    {
                        width: dim.width, 
                        height: dim.height, 
                        zIndex: this.state.visible,
                        position: 'absolute',
                        top:0,
                        left:0
                    }
                }
                resizeMode = {"cover"}
                fadeDuration = {0}
                />
        
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