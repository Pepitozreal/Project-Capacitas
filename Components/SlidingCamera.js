import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ViewPagerAndroid,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  Button,
  PanResponder,
  Animated,
  Easing
} from "react-native";
import { Camera, Permissions } from "expo";
import Storage from "../Providers/storage.js";
import Drawer from 'react-native-drawer'
import CameraModule from './Camera.js'

import { Ionicons } from '@expo/vector-icons';

dim = Dimensions.get("screen")

export default class SlidingCamera extends React.Component {
    allowSwipe;
    constructor(props) {
      super(props);

      this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => this.allowSwipe,
          onMoveShouldSetPanResponder: () => this.allowSwipe,
          onPanResponderGrant: () => {
          },
          onPanResponderMove: (evt, gestureState) => {
            Animated.timing(
                this.state.progress,
                {
                    toValue: (dim.height-gestureState.moveY)/dim.height,
                    duration: 10,
                    easing: Easing.linear
                }
            ).start();

          },
          onPanResponderRelease: (evt, gestureState) => {
              if (gestureState.vy < 0) {

                Animated.timing(
                    this.state.progress,
                    {
                        toValue: 1,
                        duration: 150,
                    
                    }
                    ).start();
              } else {
                Animated.timing(
                    this.state.progress,
                    {
                        toValue: 0,
                        duration: 150,
                   
                    }
                  ).start();
              }
          }
      })


      this.allowSwipe = this.props.allowSwipe
      this.state = {
          isOpen: false,

          progress: new Animated.Value(0),
          headerOffset: new Animated.Value(0)
      };
    }

    componentWillReceiveProps(newProps) {
        this.allowSwipe = newProps.allowSwipe
    }

    close() {
        Animated.timing(
            this.state.progress,
            {
                toValue: 0,
                duration: 200,
           
            }
          ).start();
    }
    
    _renderHeader() {
        let {progress} = this.state
        return (
            <Animated.View {...this._panResponder.panHandlers} 
            hitSlop = {{top:50}}
            style = {
                {
                    transform: [{translateY: progress.interpolate({inputRange:[0,1], outputRange: [0, 75]})}],
                    height: 75, 
                    backgroundColor: 'transparent',
                    zIndex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }
            }>
                <Animated.View
                    style = {
                        {
                            transform: [
                                {
                                    rotateZ: progress.interpolate(
                                        {
                                            inputRange:[0,1], outputRange: ['0deg', '180deg'] 
                                        }
                                    )
                                }
                            ]
                        }
                    }>
                    <Ionicons name="ios-arrow-up" size = {48} color = "#ccc"/>
                </Animated.View>
            </Animated.View>
        )
    }


    render() {
        let {progress} = this.state
      return (
        <View>
            {this.props.children}
            <Animated.View style = {{transform: [{translateY: progress.interpolate({inputRange:[0, 1], outputRange:[-75, -dim.height - 75]})}]}}>
                {this._renderHeader()}
                <CameraModule 
                    topic = {this.props.topic}
                    onPictureTaken = {this.props.onPictureTaken}/>
            </Animated.View>
        </View>

      );
    }
  }

  const styles = {
      container: {
        height: dim.height,
        width: dim.width,
        translateY: -dim.height,
        overflow: 'visible'
      },
      container2: {
        height: dim.height,
        width: dim.width,
        overflow: 'visible',
        pointerEvents: 'none'
      },
      input: {
          height: 50, 
          width: 300,
          fontSize: 20
      }
  }