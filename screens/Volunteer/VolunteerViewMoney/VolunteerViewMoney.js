/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView} from "react-native";
import {Text,Button,Card} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../../theme"
import {connect} from "react-redux"
import { change_request, requestsError } from '../../../store/actions/requests';
import { setReceiver } from '../../../store/actions/chat';
import Loading from "../../LoadingComponent"
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
  change:(token,id,request)=>dispatch(change_request(token,id,request)),
  setId:(id)=>dispatch(setReceiver(id))
})
class VolunteerViewMoney extends React.Component {
  constructor(props) {
    super(props);
  
  }
  acceptRequest=()=>{
    let request=this.props.requests.request;
    request.status="Accepted";
    request.volunteer=this.props.auth.user._id;
    this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
      this.props.navigation.navigate("VolunteerTabs");
    })


  }
  cancelRequest=()=>{
    let request=this.props.requests.request;
    request.status="Not active";
    request.volunteer=null;
    this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
      this.props.navigation.navigate("VolunteerTabs");
    })

  }
  startChat=()=>{
    this.props.setId(this.props.requests.request.user.id);
    this.props.navigation.navigate("Chat");
  }

  render() {
    if (this.props.requests.isLoading) return (<Loading/>) 
    else
    return (
      <ScrollView>
      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
            <Text h1>
              Request for money
            </Text>
            <Card title={this.props.requests.request.name} containerStyle={{backgroundColor:"yellow"}}>
                           
              <Text>Request status:{this.props.requests.request.status}</Text>
              <Text>User name:{this.props.requests.request.user?this.props.requests.request.user.name:""}</Text>
              <Text>Request purpose:{this.props.requests.request.purpose}</Text>
              <Text>Request amount:{this.props.requests.request.amount}</Text>
              <Text>CC Number:{this.props.requests.request.ccnumber}</Text>
              <Text>User phone:{this.props.requests.request.user?this.props.requests.request.user.phone:""}</Text>
            </Card>
         
            <Button title="Accept Request" onPress={this.acceptRequest} ></Button>
            <Button title="Cancel Request" onPress={this.cancelRequest} ></Button>
            <Button title="Chat" onPress={this.startChat}></Button>
            <Button title="Cancel" onPress={()=>this.props.navigation.goBack()}></Button>
           </ThemeProvider> 
        </View>
        </ScrollView>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  center:{
    justifyContent:"center"
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(VolunteerViewMoney);