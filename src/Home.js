import React, { Component } from 'react';
import {
  View, Text, Image, ListView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  AsyncStorage,
  Modal,
  Button
} from 'react-native';

import DatePicker from 'react-native-datepicker'
import { Scene, Actions } from 'react-native-router-flux';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows([]),
      enrollModalVisible: false,
      purchaseDate: "",
      expireDate: "",
      alarm0: "",
      item: "",
      amount: "",
      rawData: []
    }
  }
  componentWillMount() {
    this.getList();
  }

  getList() {
    AsyncStorage.getItem('@BoNengStorage:nengInfo')
      .then((body)=>{
        if (body) {
          let data = JSON.parse(body);
          this.setState({dataSource: ds.cloneWithRows(data)});
          console.log(data);
          this.setState({rawData: data});
        }
      });
  }

  save(){
    let itemSet = {
      item: this.state.item,
      amount: this.state.amount,
      purchaseDate: this.state.purchaseDate,
      expireDate: this.state.expireDate
    };

    this.state.rawData.push(itemSet);
    AsyncStorage.setItem('@BoNengStorage:nengInfo', JSON.stringify(this.state.rawData));

    console.log(this.state.rawData);
    this.setState({enrollModalVisible:false});
    this.getList();
    Actions.pop();
  }
  cancel(){
    this.setState({enrollModalVisible:false});
    Actions.pop();
  }

  render () {

    return (
      <View>
        <View>
          <Image source={require("../src/image/refrigerator.png")}
                 style={{width:370, height:250, alignContent:"center"}}
                 resizeMode={"contain"}
          />
        </View>
        <View>
          <View style={{flexDirection:"row", padding:10, height:30, borderBottomColor:"black", borderWidth:1, alignItems:"center"}}>
            <Text style={{flex:1}}>No</Text>
            <Text style={{flex:1, textAlign:"center"}}>품목</Text>
            <Text style={{flex:1, textAlign:"center"}}>수량</Text>
            <Text style={{flex:2, textAlign:"center"}}>유통기한</Text>
            <View style={{flex:1, alignItems:"flex-end", borderBottomColor:"black", borderWidth:1}}>
              <TouchableOpacity onPress={()=> {this.setState({enrollModalVisible:true})}}>
                <Image source={require("../src/image/circular-arrow-with-plus-sign.png")}
                       style={{width:20, height:20}}
                />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, setion, index) =>
            <View style={{flexDirection:"row"}}>
              <Text style={{flex:1, textAlign:"center"}}>{parseInt(index)+1}</Text>
              <Text style={{flex:1, textAlign:"center"}}>{rowData.item}</Text>
              <Text style={{flex:1, textAlign:"center"}}>{rowData.amount}</Text>
              <Text style={{flex:2, textAlign:"center"}}>{rowData.expireDate}</Text>
            </View>
          }
        />
        <View>
          <Button onPress={()=> this.getList()} title="불러오기"/>
        </View>

        <Modal animationType="slide"
               transparent={true}
               visible={this.state.enrollModalVisible}
               onRequestClose={()=>{this.setState({enrollModalVisible: false})}}>
          <TouchableWithoutFeedback onPress={()=> this.setState({enrollModalVisible: false})}>
            <View style={{flex:1, flexDirection: "column", paddingTop:70, paddingBottom:100, padding:30, backgroundColor: "#00000030", justifyContent: "center"}}>
              <TouchableWithoutFeedback onPress={()=> this.setState({enrollModalVisible: true})}>
                <View style={{flex:1, flexDirection: "column", padding:20, backgroundColor: "pink"}}>
                  <View style={{alignItems: "center"}}><Text>등록</Text></View>
                  <View style={{borderTopWidth:1, borderTopColor: "red", flexDirection:"row", alignItems: "center"}}>
                    <View style={{flex: 2, flexDirection:"row"}}>
                      <Text style={{flex:1}}>품목</Text>
                      <TextInput
                        value={this.state.item}
                        onChangeText={(text) => this.setState({item: text})}
                        placeholder={"품목"}
                        style={{flex:2}}/>
                    </View>
                    <View style={{flex:1, flexDirection:"row"}}>
                      <Text style={{flex:1}}>수량</Text>
                      <TextInput
                        style={{flex:1}}
                        value={this.state.amount}
                        onChangeText={(amount) => this.setState({amount: amount})}
                        keyboardType={"numeric"}
                        placeholder={"갯수"}
                      />
                    </View>
                  </View>
                  <View style={{borderTopWidth:1, borderTopColor: "red", flexDirection:"row", alignItems: "center"}}>
                    <Text style={{flex:1}}>구매일</Text>
                    <DatePicker
                      style={{flex:2}}
                      date={this.state.purchaseDate}
                      mode="date"
                      placeholder="구매일"
                      format="YYYY-MM-DD"
                      confirmBtnText="선택"
                      cancelBtnText="취소"
                      customStyles={{
                        dateInput: {height: 20, borderColor: "transparent", borderBottomColor: "#ccc"},
                      }}
                      showIcon={false}
                      onDateChange={(date) => {this.setState({purchaseDate: date})}}
                    />
                  </View>
                  <View style={{borderTopWidth:1, borderTopColor: "red", flexDirection:"row", alignItems: "center"}}>
                    <Text style={{flex:1}}>유통기한</Text>
                    <DatePicker
                      style={{flex:2}}
                      date={this.state.expireDate}
                      mode="date"
                      placeholder="유통기한"
                      format="YYYY-MM-DD"
                      confirmBtnText="선택"
                      cancelBtnText="취소"
                      customStyles={{
                        dateInput: {height: 20, borderColor: "transparent", borderBottomColor: "#ccc"},
                        dateText: {float: "left"}
                      }}
                      showIcon={false}
                      onDateChange={(date) => {this.setState({expireDate: date})}}
                    />
                  </View>
                  <View style={{borderWidth:1, borderTopColor: "red", flexDirection:"column"}}>
                    <View style={{flexDirection: "row"}}>
                      <Text style={{flex:1, height: 30, alignItems:"center", borderWidth:1}}>알림 설정</Text>
                      <View style={{flex:2, marginLeft:10, marginTop:5, borderColor: "blue", borderWidth: 1, alignItems: "flex-end"}}>
                        <TouchableOpacity>
                          <Image source={require("../src/image/cogwheel.png")}
                                 style={{width: 20, height:20}}/>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View>
                      <DatePicker
                        date={this.state.alarm0}
                        mode="datetime"
                        placeholder="유통기한 알람"
                        format="YYYY-MM-DD  h:mm"
                        confirmBtnText="선택"
                        cancelBtnText="취소"
                        customStyles={{
                          dateInput: {height: 20, borderColor: "transparent", borderBottomColor: "#ccc"},
                        }}
                        showIcon={false}
                        onDateChange={(datetime) => {this.setState({alarm0: datetime})}}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop:10}}>
                    <TouchableOpacity onPress={()=> this.save()}
                                      style={{width:50, height:30 ,borderRadius:15, backgroundColor: "red", alignItems: "center", justifyContent:"center"}}>
                      <Text>확인</Text>
                    </TouchableOpacity>
                    <View style={{width:10}}/>
                    <TouchableOpacity onPress={()=> this.cancel()}
                                      style={{width:50, height:30 ,borderRadius:15, backgroundColor: "red", alignItems: "center", justifyContent:"center"}}>
                      <Text>취소</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}