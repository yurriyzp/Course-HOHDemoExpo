/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView} from "react-native";
import {Text,Input,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../../theme"
import {connect} from "react-redux"
import { place_request,get_requests } from '../../../store/actions/requests';
import Loading from "../../LoadingComponent"
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
    send_req:(token,name,type,goods,description,purpose,amount,ccnumber)=>dispatch(place_request(token,name,type,goods,description,purpose,amount,ccnumber)),

    get_req:(token)=>dispatch(get_requests(token))
})
class UserServiceHelp extends React.Component {
  constructor(props) {
    super(props);
    this.input=React.createRef();
    this.state={
     
      name:"",
      decription:"",
      
      
    }
  }

  changeName=(e)=>{
    this.setState({
      name:e
    })
  }
  changeDescription=(e)=>{
    this.setState({
      decription:e
    })
  }
  componentDidMount(){
    this.input.current.setNativeProps({
        multiline:true
    })

  }
send=()=>{

  if (this.state.name=="" || this.state.description=="") 
  alert("You should fill all fields");
 
 else
 

  this.props.send_req(
    this.props.auth.token,
    this.state.name,
    "service",
    [],
    this.state.decription,
    "",
    "",
    ""
  ).then(()=>{
    if (!this.props.requests.errMes)
  
    this.props.get_req(this.props.auth.token).
    then(()=>
    { if (!this.props.requests.errMes)
      {
        alert("ok!");
        this.props.navigation.navigate("UserList")
      }
      
      else this.setState({
        errMes:this.props.requests.errMes
      })
    })
    .catch((err)=>alert(err))
    else this.setState({
      errMes:this.props.requests.errMes
    })
  }).catch((err)=>alert(err))
    
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
            <Input
                label='Name' onChangeText={this.changeName} value={this.state.name}
            />
           
            <Input
                ref={this.input}
                inputContainerStyle={{height:100}}
                label="Description"
                onChangeText={this.changeDescription} value={this.state.decription}
            
            />
            
         
                 
            <Button title="Send Request" onPress={this.send}></Button>
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
export default connect(mapStateToProps,mapDispatchToProps)(UserServiceHelp);
