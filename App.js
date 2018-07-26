import React from 'react';
import { StyleSheet, Text, View, ViewPagerAndroid, Dimensions, TouchableHighlight, AsyncStorage, } from 'react-native';
import CameraNew from "./Components/Camera.js";
export default class App extends React.Component {

constructor(props) {
  super(props)
    
    this.state = {
      text: "Press to change",
     
    }
} 


    render() {
    text = this.state.text;
    number = this.state.number;
    return (
      <ViewPagerAndroid
        style = {styles.viewPager}>

      <View style={styles.container}>
        <Text style = {styles.text} onPress = {() => {alert("Hej")}}>Click me</Text>
        <Text 
        style = {{marginLeft: number, ...styles.text}}
        onPress = {() => {this.setState({text: "I changed!"})}}> {text}</Text>
        </View>

     <View style = {styles.container}> 
         <CameraNew>
         </CameraNew>
     </View>
     
      <View style = {styles.container2}>
     </View>
      </ViewPagerAndroid>
    );
    
  }

} 

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "white",
  },
  viewPager: {
    flex: 1
  },

};
