/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,Image} from "react-native";
import {Text,Input,Button} from "react-native-elements";

import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../theme";
import {connect} from "react-redux"
import {login} from "../../store/actions/auth"
import { get_requests } from '../../store/actions/requests';
import Loading from "../LoadingComponent"
import { Dimensions } from 'react-native';
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;


const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});

const mapDispatchToProps=(dispatch)=>({
    login:(creds)=>dispatch(login(creds)),
    get_req:(token)=>dispatch(get_requests(token))
})
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      password:"",
      errMess:""
    }
  
  }
  changeUserName=(e)=>{
    this.setState({
        username:e
    })
}

changePassword=(e)=>{
    this.setState({
        password:e
    })
}


  login=()=>{ 
    this.props.login({
      username:this.state.username,
      password:this.state.password
    }).then(()=>{
      if (!(this.props.auth.errMess)){
        
        if (this.props.auth.user.role=="User"){

          this.props.get_req(this.props.auth.token).then(resp=>{
            if (!(this.props.requests.errMess)){
              
              this.props.navigation.navigate("UserTabs");   
            }
            else this.setState({
              errMess:this.props.requests.errMess
            })


            
          })
          
        }
        else if (this.props.auth.user.role=="Volunteer"){


          this.props.get_req(this.props.auth.token).then(resp=>{
            if (!(this.props.requests.errMess)){
              
              this.props.navigation.navigate("VolunteerTabs");   
            }
            else this.setState({
              errMess:this.props.requests.errMess
            })


            
          })
          
        }
        
      }
      else this.setState({
        errMess:this.props.auth.errMess
      })
      
      
    }).catch((err)=>this.setState({
      errMess:err
    }))

  }


  render() {
    if (this.props.auth.isLoading) return (<Loading/>)
    
    else 
    return (
      <View style={{flex:1,alignItems:"center",backgroundColor:"#FAFAFA",}}>
      <ThemeProvider theme={theme}>
        <View style={{marginTop:50,alignItems:"center"}}>
            <Text h1 style={{fontFamily:"Arial"}}>Hands of Help</Text>
            <Image source={require("../images/hand.jpg")} style={{width:W*0.9,marginTop:20,marginBottom:20}} />
            </View>
            <View style={{marginTop:20,marginBottom:20,alignItems:"center",flex:10}}>
            <Input
                placeholder='Username' placeholderTextColor="black" onChangeText={this.changeUserName} value={this.state.username} containerStyle={{width:W*0.9}}  inputContainerStyle={{borderColor:"black",borderBottomWidth:2,}}
            />
            <Input
                placeholder='Password' placeholderTextColor="black" onChangeText={this.changePassword} value={this.state.password}  containerStyle={{width:W*0.9,borderColor:"black"}} inputContainerStyle={{borderColor:"black",borderBottomWidth:2}}
            />
            <Text style={{color:"red",fontSize:24}}>{this.state.errMess}</Text>
 
            
            <Button title="Login" onPress={this.login} buttonStyle={{width:W*0.5,height:60}}></Button>
        
            </View>
            <View style={{flexDirection:"row",flex:2,width:W*0.9,alignItems:"center"}}>
            <Button title="I could help" onPress={()=>this.props.navigation.navigate("RegistrationVolunteer")} buttonStyle={{width:W*0.45,height:60}}></Button>
            <Button title="I need help" onPress={()=>this.props.navigation.navigate("RegistrationUser")} buttonStyle={{width:W*0.45,height:60}}></Button>
            </View>

            </ThemeProvider>
        </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);