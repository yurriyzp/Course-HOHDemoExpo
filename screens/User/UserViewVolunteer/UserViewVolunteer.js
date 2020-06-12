/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View} from "react-native";
import {Text,Input,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../../theme"
import {connect} from "react-redux"
const mapStateToProps=state=>({
  auth:state.auth,
  
  geo:state.geo,
  chat:state.chat

  


});


class UserViewVolunteer extends React.Component {
  constructor(props) {
    super(props);
  
  }
  startChat=()=>{
    this.props.navigation.navigate("Chat");
  }


  render() {
let volunteer=this.props.geo.volunteers_near.find(val=>val._id===this.props.chat.receiver);

    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
            <Text h1>Volunteer:</Text>
            <Text h1>
               {
               volunteer.name
               }
            </Text>
            <Text h3>{volunteer.adress}</Text>
            <Text h3>{volunteer.phone}</Text>
          <Button title="Chat" onPress={this.startChat}></Button>
         <Button title="Cancel" onPress={()=>this.props.navigation.goBack()}></Button>

         

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

export default connect(mapStateToProps)(UserViewVolunteer);