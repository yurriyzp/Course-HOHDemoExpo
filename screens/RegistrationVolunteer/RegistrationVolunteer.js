/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView,Image} from "react-native";
import {Text,Input,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../theme";
import {signup} from "../../store/actions/auth";
import {connect} from "react-redux";
import * as Location from 'expo-location';
import Loading from "../LoadingComponent"

import { Dimensions } from 'react-native';
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;


const mapStateToProps=(state)=>({
  auth:state.auth
  });

const mapDispatchToProps=(dispatch)=>({
    register:(creds)=>dispatch(signup(creds))
})
 class RegistrationVolunteer extends React.Component {
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
        role:"Volunteer"


    };
    if (this.state.name=="" || this.state.username=="" || this.state.email=="" ||this.state.adress=="" ||
    this.state.phone=="" || this.state.lat=="" || this.state.lon=="" 
) alert("You should fill all fields");

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
      <ScrollView contentContainerStyle={{height:"100%"}}>
      <View style={{flex:1,alignItems:"center",backgroundColor:"#FAFAFA",}}>
      <ThemeProvider theme={theme}>
            <Text h1>
              Volunteer Registration
            </Text>
            <Input
                placeholder='Name' placeholderTextColor="black" onChangeText={this.changeName} value={this.state.name}
            />
              <Input
                placeholder='Username' placeholderTextColor="black" onChangeText={this.changeUserName} value={this.state.username}
            />
              <Input
                placeholder='Password' placeholderTextColor="black" onChangeText={this.changePassword} value={this.state.password}
            />
              <Input
                placeholder='Email' placeholderTextColor="black" onChangeText={this.changeEmail} value={this.state.email}
            />

              <Input
                placeholder='Adress' placeholderTextColor="black" onChangeText={this.changeAdress} value={this.state.adress}
            />
            <Button title="Geo" onPress={this.givePermission} buttonStyle={{width:W*0.45,height:60}}></Button>
              <Input
                placeholder='latitude'  placeholderTextColor="black"onChangeText={this.changeLat} value={String(this.state.lat)}
            />
              <Input
                placeholder='longitude' placeholderTextColor="black"onChangeText={this.changeLon} value={String(this.state.lon)}
            />
            
              <Input
                placeholder='Phone number'  placeholderTextColor="black"onChangeText={this.changeTel} value={String(this.state.tel)}
            />
            <Text>{this.state.errMess}</Text>
            <View style={{flexDirection:"row"}}>
              <Image style={{width:W*0.3,height:W*0.3,borderWidth:2,borderColor:"black"}} source={{uri:"https://picsum.photos/200"}}/>
              <Button title="Select Image" onPress={this.register}></Button>
            </View>
            <View style={{flexDirection:"row",flex:2,width:W*0.9,alignItems:"center"}}>
            <Button title="Cancel" onPress={()=>this.props.navigation.goBack()} buttonStyle={{width:W*0.45,height:60}}></Button>
            <Button title="Register" onPress={this.register} buttonStyle={{width:W*0.45,height:60}}></Button>
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
export default connect(mapStateToProps,mapDispatchToProps)(RegistrationVolunteer);