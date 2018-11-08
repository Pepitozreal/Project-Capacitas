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
  Image,
  PanResponder
} from "react-native";
import { Camera, Permissions } from "expo";
import Storage from "../Providers/storage.js";

import ImageView from "./ImageView.js";
import Ionicons from "@expo/vector-icons/Ionicons";

dim = Dimensions.get("screen");

export default class Scrubber extends React.Component {
  data = [];
  index = 0;
  interval = 2;
  min = 3
  max = 1
  c = 0;
  c2 = 0;
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images,
      isActive: this.props.isActive
    };

    this.data = this.props.images.map((v, i) => {
      return {
        uri: v.uri,
        id: i,
        ctx: null
      };
    });

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => (gestureState.vx*gestureState.vx + gestureState.vy*gestureState.vy)*Math.pow(10,18) < 3 || Math.abs(gestureState.vy) > 3* Math.abs(gestureState.vx),
        onPanResponderGrant: () => {
            this.c2 = setTimeout(this.startCycle.bind(this), 100)
        },
        onPanResponderMove: (evt, gestureState) => {
            scaledMove = gestureState.dy/400;
            scaledMove = Math.min(scaledMove, 1)
            scaledMove = Math.max(scaledMove, -1)
            this.interval = scaledMove + 2
            
        },
        onPanResponderRelease: (evt, gestureState) => {
            clearTimeout(this.c)
            clearTimeout(this.c2)
        },
        onPanResponderEnd: () => {
            clearTimeout(this.c)
            clearTimeout(this.c2)
        },
        onPanResponderTerminate: () => {
            clearTimeout(this.c)
            clearTimeout(this.c2)
        }
    })
  }

  next() {
    if (!this.state.isActive) return;
    this.data[this.index].ctx.setInvisible();
    this.index = (this.index + 1) % this.data.length;
    this.data[this.index].ctx.setVisible();
  }

  previous() {
    if (!this.state.isActive) return;
    this.data[this.index].ctx.setInvisible();
    this.index = this.index -1;
    if(this.index < 0) {
        this.index = this.data.length -1
    }
    this.data[this.index].ctx.setVisible();
  }

  last() {
    if (!this.state.isActive) return;
    this.data[this.index].ctx.setInvisible();
    this.index = this.data.length - 1;
    this.data[this.index].ctx.setVisible();
  }

  first() {
    if (!this.state.isActive) return;
    this.data[this.index].ctx.setInvisible();
    this.index = 0;
    this.data[this.index].ctx.setVisible();
  }

  startCycle() {
    
    func = () => {
        this.next();
        this.c = setTimeout(func.bind(this), Math.pow(10,this.interval))
    }
    this.c = setTimeout(func.bind(this), this.interval)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.index !== this.state.index) {
      this.setState({ index: newProps.index });
    }
    if (newProps.isActive !== this.state.isActive) {
        this.setState({isActive: newProps.isActive})
    }

    if (newProps.images) {
      if (newProps.images.length !== this.data.length) {
        this.data = this.props.images.map((v, i) => {
          return {
            uri: v.uri,
            id: i,
            ctx: null
          };
        });

        this.forceUpdate(() => {
          this.last()
        });
      }
    }
  }

  _renderImage(item) {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        {
            this.state.isActive ?
                this.data.map((v, i) => {
                    return (
                        <ImageView
                            uri={v.uri}
                            key={v.id}
                            ref={ref => {
                                if (!ref) return;
                                this.data[i].ctx = ref;
                            }}
                        />
                    );
                }) 
                    :
                <ImageView
                    uri={this.data[this.index].uri}
                    key={"placeholder"}
                />           
        }
      </View>
    );
  }

  render() {
    return this.data.length !== 0 ? (
      this._renderImage()
    ) : (
      <View>
        <Text>No images yet, swipe to start your journey!</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: dim.height,
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
};
