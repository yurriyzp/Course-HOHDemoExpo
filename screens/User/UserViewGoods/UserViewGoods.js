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
class UserViewGoods extends React.Component {
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
              Request for goods
            </Text>
            <Card title={this.props.requests.request.name} containerStyle={{backgroundColor:"yellow"}}>
            <Text >Request status:{this.props.requests.request.status}</Text>
            <Text >Volunteer name:{this.props.requests.request.volunteer?this.props.requests.request.volunteer.name:""}</Text>
              
              
            </Card>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
            <View style={styles.column}>
            <Text style={styles.textStyle}>Name:</Text>
            </View>
            <View style={styles.column}>
            <Text style={styles.textStyle}>Amount:</Text>
            </View>
            <View style={styles.column}>
            <Text style={styles.textStyle}>Where:</Text>
            </View>

            <View style={styles.column}>
            <Text style={styles.textStyle}>Status:</Text>
            </View>
            </View>
            {
              this.props.requests.request.goods.map((item,idx)=>{
                return (
                  <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center",}}>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.name}</Text>
                  </View>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.amount}</Text>
                  </View>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.place}</Text>
                  </View>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.status}</Text>
                  </View>
                  </View>
                 
                 
                 
                 
                )
              })
            }
         
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
  },
  column:{
    flex:1,
    borderBottomColor:"yellow",
    borderBottomWidth:2
  },
  textStyle:{
    color:"white",
    fontWeight:"bold"
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(UserViewGoods);
