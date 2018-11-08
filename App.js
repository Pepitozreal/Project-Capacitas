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
  Image,
  FlatList
} from "react-native";
import CameraNew from "./Components/Camera.js";
import CreateTopic from "./Components/CreateTopic.js"
import Storage from "./Providers/storage.js";
import TopicView from "./Components/Topic.js"
import SlidingCamera from "./Components/SlidingCamera.js"
dim = Dimensions.get("screen")
export default class App extends React.Component {

  pullup;
  list;
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      pageIndex: 0
    };
    Storage.loadAllTopics().then(topics => {this.setState({topics: topics})})
  }
  _onTopicCreated(topic) {
    newTopics = this.state.topics;
    newTopics.push(topic)
    this.setState({topics: newTopics})
  }
  _renderChild(item) {
    if (item.item.id == "createTopic") {
      return (
        <CreateTopic onTopicCreated = {this._onTopicCreated.bind(this)}/>
      )
    } else {
      return <TopicView 
        topic = {item.item}
        onTopicDeleted = {() => Storage.loadAllTopics().then(topics => {this.setState({topics: topics})})}
        isActive = {item.index + "" + this.state.pageIndex}/>
    }
  }
  render() {
    data = this.state.topics.slice();
    data.push({id: "createTopic"});
    return (
      <View style = {{flex:1, width: dim.width}}>
        <SlidingCamera 
          ref = {
            (ref) => {
              this.pullup = ref;
            }
          }
          topic = {data[this.state.pageIndex]}
          onPictureTaken = {() => {
            Storage.loadAllTopics().then(topics => {this.setState({topics: topics})})
            this.pullup.close()
          }}>
          <FlatList
            style = {{height: dim.height, width: dim.width}}
            data = {data}
            keyExtractor = {(item, id) => item.id}
            renderItem = {this._renderChild.bind(this)}
            horizontal = {true}
            pagingEnabled = {true}
            ref = {ref => {
              this.list = ref
            }}
            onScrollEndDrag = {evt => { 
              const newIndex = evt.nativeEvent.velocity.x > 0 ? Math.floor(evt.nativeEvent.contentOffset.x/dim.width) : Math.ceil(evt.nativeEvent.contentOffset.x/dim.width) 
              this.list.scrollToIndex({
                index: newIndex,
                viewOffset: 0,
                viewPosition: 0,
                animated: true
              })
              this.setState({pageIndex:newIndex})
            }}
            />
        </SlidingCamera>
      </View>
    );
  }
}

// <View style={styles.container}>
//           <CameraNew />
//         </View>

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
/**
 * return (
      <ViewPagerAndroid style={styles.viewPager}>

        <View style={styles.container2}>
        <Image style = {{width: 300, height: 500, borderWidth: 1, borderColor: 'black', backgroundColor:'red'}} source = {{uri:Storage.Image}}/>
          <View style={{ flexDirection: "row" }}>
            <Button title="Load" onPress={async () => {await Storage.loadImage(); this.forceUpdate()}} />
          </View>
        </View>
        
        <FlatList
          data={this.state.topics}
          keyExtractor={(item,id)=>item}
          renderItem = {(item) => <View style={{flex: 1}}><Text>{item.item}</Text></View>}
          />
        <View>
          <CreateTopic onTopicCreated = {(topic) => {
            this.setState({topics: this.state.topics.push(topic)})
          }}/>
        </View>
      </ViewPagerAndroid>
    );
 */