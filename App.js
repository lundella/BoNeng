import React from 'react';
import { Text, View, Image, TouchableOpacity, AppRegistry } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Home from './src/Home'
import Setting from './src/Setting'

export default class App extends React.Component {
  render() {
    return (
      <Router navigationBarStyle={{height: 70, backgroundColor: "gray"}}
              titleStyle={{backgroundColor: "ivory"}}
              scenStyle={{flex:1}}>
        <Scene key="root">
          <Scene key="home" component={Home} title="BoNeng" initial="{true}"
                 renderRightButton={()=> this.settingButton()}
                 renderLeftButton={()=> this.enrollButton()}
          />

          <Scene key="setting" component={Setting} title="설정"/>

          {/*<Scene key="login" component={Login} title="로그인"/>*/}
        </Scene>
      </Router>
    );
  }


  settingButton() {
    return (
      <TouchableOpacity style={{marginRight:10}} onPress={()=>Actions.setting()}>
        <View style={{flexDirection: "row"}}>
          <Image srouce={require('./src/image/cogwheel.png')}
                 // style={{width:18, height:18}}
          />
          <Text>설정</Text>
        </View>
      </TouchableOpacity>
    )
  }

  enrollButton() {
    return (
      <TouchableOpacity style={{backgroundColor: "#ccc"}}>
        <View>
          <Text>+등록</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

AppRegistry.registerComponent('BoNeng', () => App);