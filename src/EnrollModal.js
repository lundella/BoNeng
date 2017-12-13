import React, { Component } from 'react';
import {
  Text, View, Modal, Image, ListView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'

export default class EnrollModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollModalVisible: true,
      purchaseDate: "",
      expireDate: "",
      alarm0: "",
      item: "",
      number: ""
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('@BoNengStorage:nengInfo')
      .then((body)=>{
        if (body) {
          let data = JSON.parse(body);
          this.setState(data);
        }
      });
  }

  save(){
    AsyncStorage.setItem('@BoNengStorage:nengInfo', JSON.stringify({
      item: this.state.item,
      number: this.state.number,
      purchaseDate: this.state.purchaseDate,
      expireDate: this.state.expireDate,
      alarm0: this.state.alarm0
    }));
    this.setState({enrollModalVisible:false});
    Actions.pop();
  }
  cancel(){
    this.setState({enrollModalVisible:false});
    Actions.pop();
  }

  render () {
    return (
      <View>
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
                        value={this.state.number}
                        onChangeText={(number) => this.setState({number: number})}
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
    )
  }
}

module.exports = EnrollModal;