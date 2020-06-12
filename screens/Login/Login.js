/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View} from "react-native";
import {Text,Input,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../theme";
import {connect} from "react-redux"
import {login} from "../../store/actions/auth"
import { get_requests } from '../../store/actions/requests';
import Loading from "../LoadingComponent"


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
      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
            <Text h3>
                Login
            </Text>
            <Input
                label='username' onChangeText={this.changeUserName} value={this.state.username}
            />
            <Input
                label='password' onChangeText={this.changePassword} value={this.state.password}
            />
            <Text style={{color:"red",fontSize:24}}>{this.state.errMess}</Text>
            <View style={{flexDirection:"row"}}>
            
            <Button title="Login" onPress={this.login}></Button>
            </View>
            <Text h3>
              Registration
            </Text>
            <View style={{flexDirection:"row"}}>
            <Button title="I could help" onPress={()=>this.props.navigation.navigate("RegistrationVolunteer")}></Button>
            <Button title="I need help" onPress={()=>this.props.navigation.navigate("RegistrationUser")}></Button>
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