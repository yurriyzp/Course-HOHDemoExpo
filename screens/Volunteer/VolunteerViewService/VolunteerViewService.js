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
import { change_request } from '../../../store/actions/requests';
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

class VolunteerViewService extends React.Component {
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
      <ScrollView contentContainerStyle={{height:"100%"}}>
      <View style={{flex:1,alignItems:"center",backgroundColor:"#FAFAFA"}}>
      <ThemeProvider theme={theme}>
          
            <Card title={this.props.requests.request.name}  titleStyle={{color:"#569B23",fontSize:40}}  containerStyle={{backgroundColor:"white",width:"85%"}}>
            <Text style={{fontSize:20}} >Request type:Service</Text>
            <Text style={{fontSize:20}}>Request status:{this.props.requests.request.status}</Text>
            <Text style={{fontSize:20}}>User name:{this.props.requests.request.user?this.props.requests.request.user.name:""}</Text>
            <Text style={{fontSize:20}}>Request description:{this.props.requests.request.description}</Text>
            <Text style={{fontSize:20}}>User phone:{this.props.requests.request.user?this.props.requests.request.user.phone:""}</Text>
              
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
export default connect(mapStateToProps,mapDispatchToProps)(VolunteerViewService);
