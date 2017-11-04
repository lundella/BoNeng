import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
  getInitialState() {
    var ds = new ListView.dataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  }

  render () {
    return (
      <View >
        <View>
          <Image source={require("../src/image/refrigerator.png")}
                 style={{width:370, height:250, alignContent:"center"}}
                 resizeMode={"contain"}
          />
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>


        <Text>This is for the BoNeng!</Text>
        <TouchableOpacity onKeyPress={() => Actions.setting()}>
          <Text>Move Setting</Text>
        </TouchableOpacity>

        <Image source={require("../src/image/cogwheel.png")}
                style={{width:18, height:18}}/>
      </View>
    );
  }
}