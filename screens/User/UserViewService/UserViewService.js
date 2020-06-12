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
import { setReceiver } from '../../../store/actions/chat';
import Loading from "../../LoadingComponent"
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
  setId:(id)=>dispatch(setReceiver(id))
  
})
class UserViewService extends React.Component {
  constructor(props) {
    super(props);
  
  }
  startChat=()=>{
    if (this.props.requests.request.volunteer!=null) {
      this.props.setId(this.props.requests.request.volunteer.id)
      this.props.navigation.navigate("Chat");
    }
  }

  render() {
    if (this.props.requests.isLoading) return (<Loading/>) 
    else
    return (
      <ScrollView>
      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
             <Text h1>
              Request for service
            </Text>
            <Card title={this.props.requests.request.name} containerStyle={{backgroundColor:"yellow"}}>
            <Text>Request status:{this.props.requests.request.status}</Text>
            <Text >Volunteer name:{this.props.requests.request.volunteer?this.props.requests.request.volunteer.name:""}</Text>
            <Text>Request description:{this.props.requests.request.description}</Text>
              
            </Card>
         
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
export default connect(mapStateToProps,mapDispatchToProps)(UserViewService);
