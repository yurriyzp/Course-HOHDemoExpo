/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View,ScrollView,Image} from "react-native";
import {Text,Button,ListItem} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {theme}  from "../../theme"
import {connect} from "react-redux"
import {get_request, delete_request,get_requests} from "../../../store/actions/requests"
import { logout } from '../../../store/actions/auth';
import { Dimensions } from 'react-native';
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});

const mapDispatchToProps=(dispatch)=>({
    view:(token,id)=>dispatch(get_request(token,id)),
    delete:(token,id)=>dispatch(delete_request(token,id)),
    get_req:(token)=>dispatch(get_requests(token)),
    logout:()=>dispatch(logout())
    
})  
class UserList extends React.Component {
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
          this.props.navigation.navigate('User', { screen: "UserViewGoods"});
          break;
        case "delivery":
          this.props.navigation.navigate('User', { screen: "UserViewDelivery"})
          break;
        case "money":
          this.props.navigation.navigate('User', { screen: "UserViewMoney"})
          break;
        case "service":
          this.props.navigation.navigate('User', { screen: "UserViewService"})
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
  deleteRequest=(id)=>{
    
 
   this.props.delete(this.props.auth.token,id).then(res=>{
     this.props.get_req(this.props.auth.token).then(res2=>{

     })
    
     
     


   })


  
 }

  render() {
  
    return (
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#FAFAFA",marginTop:50}}>
      <ThemeProvider theme={theme}>
            <Text h3>{this.props.auth.user?this.props.auth.user.name:""}</Text>
            <Image style={{width:W*0.3,height:W*0.3,borderWidth:2,borderColor:"black"}} source={{uri:"https://picsum.photos/200"}}/>
            <View style={{flexDirection:'row'}}>
            <Button title="Logout" onPress={()=>this.props.logout()} buttonStyle={{width:W*0.40,height:60}}></Button>
            <Button title="Update" onPress={()=>this.update()} buttonStyle={{width:W*0.40,height:60}}></Button>
            </View>
            <Text h4>
              My requests
            </Text>
          
            
        <View style={{flex:1,width:"100%",alignItems:"center"}}>
  { (this.props.requests.requests)?
    this.props.requests.requests.map((item, i) => (
      <ListItem
        key={i}
        title={item.name}
      
        titleStyle={{color:"#569B23",fontSize:20,}}
        style={{margin:20,width:"85%",borderRadius:40}}
        containerStyle={{borderRadius:40,shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,}}
        
        onPress={()=>this.viewRequest(item.id)}
        subtitle={
            <View style={{flexDirection:"row",backgroundColor:"white",}}>
            <View  style={{flexDirection:"column",flex:10,}}>
        <Text style={{fontSize:20}}>Request type{item.isDelivery?"Delivery":item.isGoods?"Goods":item.isMoney?"Money":item.isService?"Service":""}</Text>
        <Text style={{fontSize:20}}>Request status{item.status}</Text>
        <Text style={{fontSize:20}}>Volunteer Name{item.volunteer?item.volunteer:"No"}</Text>
            </View>
            <Icon name='rowing' onPress={()=>this.deleteRequest(item.id)}></Icon>
            </View>
           
        }
      />
    )):
      {}
  }
  

  </View>

  <Button title="Add Request" onPress={()=>this.props.navigation.navigate('UserAddRequest')}></Button>
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
export default connect(mapStateToProps,mapDispatchToProps)(UserList);