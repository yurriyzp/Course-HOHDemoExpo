/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View} from "react-native";
import {Text,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../../theme"

export default class Test extends React.Component {
  constructor(props) {
    super(props);
  
  }


  render() {

    return (
      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
            <Text h1>
               Select type of help
            </Text>
            <Button onPress={()=>this.props.navigation.navigate('User', { screen: "UserGoodsHelp"})} title="Request for goods"></Button>
            <Button onPress={()=>this.props.navigation.navigate('User', { screen: "UserDeliveryHelp"})} title="Request for delivery"></Button>
            <Button onPress={()=>this.props.navigation.navigate('User', { screen: "UserServiceHelp"})} title="Request for service"></Button>
            <Button onPress={()=>this.props.navigation.navigate('User', { screen: "UserMoneyHelp"})} title="Request for Money"></Button>
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
