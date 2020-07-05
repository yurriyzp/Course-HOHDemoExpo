/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView} from "react-native";
import {Text,Button,Card,ListItem} from "react-native-elements";
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


class UserViewDelivery extends React.Component {
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
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View style={{flex:1,alignItems:"center",backgroundColor:"#FAFAFA"}}>
      <ThemeProvider theme={theme}>
          
            <Card title={this.props.requests.request.name} titleStyle={{color:"#569B23",fontSize:40}} containerStyle={{backgroundColor:"white",width:"85%"}}>
            <Text style={{fontSize:20}} >Request type:Delivery</Text>
              <Text style={{fontSize:20}}>Request status:{this.props.requests.request.status}</Text>
              <Text style={{fontSize:20}}>Volunteer name:{this.props.requests.request.volunteer?this.props.requests.request.volunteer.name:""}</Text>
              
              
            </Card>
            <Text h3>Goods list</Text>
            {
              this.props.requests.request.goods.map((item,idx)=>(
               

                  <ListItem
                  key={idx}
                  title={item.name}
                  titleStyle={{color:"#569B23",fontSize:20,}}
                  style={{margin:20,width:"85%"}}
                  bottomDivider
                  
                  onPress={()=>this.viewRequest(item.id)}
                  subtitle={
                      <View style={{flexDirection:"row",backgroundColor:"white",}}>
                      <View  style={{flexDirection:"column",flex:10,borderRadius:30}}>
                  <Text style={{fontSize:20}}>Amount {item.amount}</Text>
                  <Text style={{fontSize:20}}>Price {item.price}</Text>
                  <Text style={{fontSize:20}}>Place {item.place}</Text>
                  <Text style={{fontSize:20}}>Status {item.status}</Text>
                      </View>
                    
                      </View>
                     
                  }
                />

                  
              
              ))
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
  },
  textStyle:{
    color:"white",
    fontWeight:"bold"
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(UserViewDelivery);