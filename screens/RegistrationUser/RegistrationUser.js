/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView} from "react-native";
import {Text,Input,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../theme";
import {signup} from "../../store/actions/auth";
import {connect} from "react-redux";
import * as Location from 'expo-location';
import Loading from "../LoadingComponent"
const mapStateToProps=(state)=>({
  auth:state.auth
  });

const mapDispatchToProps=(dispatch)=>({
    register:(creds)=>dispatch(signup(creds))
})
 class RegistrationUser extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      username:"",
      password:"",
      tel:"",
      email:"",
      lat:1,
      lon:1,
      adress:"",
      errMess:"",
      redirect:""
  }
  
  }
  register=()=>{
    let creds={
        name:this.state.name,
        username:this.state.username,
        password:this.state.password,
        email:this.state.email,
        adress:this.state.adress,
        phone:this.state.tel,
        lat:this.state.lat,
        lon:this.state.lon,
        role:"User"


    };

if (this.state.name=="" || this.state.username=="" || this.state.email=="" ||this.state.adress=="" ||
    this.state.phone=="" || this.state.lat=="" || this.state.lon=="" 
) alert("You should fill all field");
else 

    this.props.register(creds).then(()=>{
        if (!(this.props.auth.errMess)){
            this.props.navigation.navigate("Login")
          }
          else this.setState({
            errMess:this.props.auth.errMess
          })   
    }).catch(()=>alert("SignUP Error"))
};
goBack(){
this.props.navigation.navigate("Login")

}
givePermission=async ()=>{
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    this.setState({errMess:'Permission to access location was denied'})
  }
  else this.getGeo()

  
}
changeName=(e)=>{
  this.setState({
      name:e
})
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

changeTel=(e)=>{
  this.setState({
      tel:e
  })
}

changeEmail=(e)=>{
  this.setState({
      email:e
  })
}
changeAdress=(e)=>{
  this.setState({
      adress:e
  })
}

changeLon=(e)=>{
  this.setState({
      lon:e
  })
}

changeLat=(e)=>{
  this.setState({
      lat:e
  })
}
getGeo=async()=>{
  let location = await Location.getCurrentPositionAsync({});
  
  this.setState({
    lat:location.coords.latitude,
    lon:location.coords.longitude
  })
  
};


  render() {
    if (this.props.auth.isLoading) return (<Loading/>)
    
    else 
    return (
      <ScrollView>
      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
            <Text h1>
               User Registration
            </Text>
            <Input
                label='Name' onChangeText={this.changeName} value={this.state.name}
            />
              <Input
                label='Username' onChangeText={this.changeUserName} value={this.state.username}
            />
              <Input
                label='Password' onChangeText={this.changePassword} value={this.state.password}
            />
              <Input
                label='Email' onChangeText={this.changeEmail} value={this.state.email}
            />

              <Input
                label='Adress' onChangeText={this.changeAdress} value={this.state.adress}
            />
            <Button title="Geo" onPress={this.givePermission}></Button>
              <Input
                label='latitude' onChangeText={this.changeLat} value={String(this.state.lat)}
            />
              <Input
                label='longitude' onChangeText={this.changeLon} value={String(this.state.lon)}
            />
            
              <Input
                label='Phone number' onChangeText={this.changeTel} value={String(this.state.tel)}
            />
            <Text>{this.state.errMess}</Text>
             <View style={{flexDirection:"row"}}>
            <Button title="Cancel" onPress={()=>this.props.navigation.goBack()}></Button>
            <Button title="Register" onPress={this.register}></Button>
            </View>
            
         

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
});
export default connect(mapStateToProps,mapDispatchToProps)(RegistrationUser);