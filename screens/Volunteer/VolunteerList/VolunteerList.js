/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView} from "react-native";
import {Text,Button,ListItem} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../../theme"
import {connect} from "react-redux"
import {get_request,get_requests} from "../../../store/actions/requests"
import { logout } from '../../../store/actions/auth';
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});

const mapDispatchToProps=(dispatch)=>({
    view:(token,id)=>dispatch(get_request(token,id)),
    logout:()=>dispatch(logout()),
    get_req:(token)=>dispatch(get_requests(token)),
})  
class VolunteerList extends React.Component {
  constructor(props) {
    super(props);
  
  }
   viewRequest=(id)=>{
     
    this.props.view(this.props.auth.token,id).then(res=>{
      
      let type=this.props.requests.request.isGoods?"goods":
      this.props.requests.request.isDelivery?"delivery":
      this.props.requests.request.isService?"service":
      this.props.requests.request.isMoney?"money":""


      
      switch (type) {
        case "goods":
          this.props.navigation.navigate('Volunteer', { screen: "VolunteerViewGoods"});
          break;
        case "delivery":
          this.props.navigation.navigate('Volunteer', { screen: "VolunteerViewDelivery"})
          break;
        case "money":
          this.props.navigation.navigate('Volunteer', { screen: "VolunteerViewMoney"})
          break;
        case "service":
          this.props.navigation.navigate('Volunteer', { screen: "VolunteerViewService"})
          break;
        default:
          break;
      }

    }).catch(err=>alert(err))

   
  }
  update=()=>{
    this.props.get_req(this.props.auth.token).then(res=>{

    },(err=>alert(err)))
    .catch(err=>alert(err))
  }
 

  render() {
  
    return (
      <ScrollView>
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue",marginTop:50}}>
      <ThemeProvider theme={theme}>
            <Text h3>Volunteer:{this.props.auth.user?this.props.auth.user.name:""}</Text>
            <Button title="Logout" onPress={()=>this.props.logout()}></Button>
            <Button title="Update" onPress={()=>this.update()}></Button>
            <Text h4>
              My requests
            </Text>
          

        <View style={{flex:1,width:"100%"}}>
  { (this.props.requests.requests)?
    this.props.requests.requests.map((item, i) => (
      <ListItem
        key={i}
        title={item.name}
        titleStyle={{color:"black",backgroundColor:"dodgerblue"}}
        style={{}}
        bottomDivider
        chevron
        onPress={()=>this.viewRequest(item.id)}
        subtitle={
            <View  >
        <Text>Request type:{item.isDelivery?"Delivery":item.isGoods?"Goods":item.isMoney?"Money":item.isService?"Service":""}</Text>
        <Text>Request status:{item.status}</Text>
        <Text>User Name:{item.user?item.user:"No"}</Text>
            </View>
        }
      />
    )):
      {}
  }
  

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
})
export default connect(mapStateToProps,mapDispatchToProps)(VolunteerList);