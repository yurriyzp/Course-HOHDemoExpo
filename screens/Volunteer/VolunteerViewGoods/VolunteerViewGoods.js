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
import { change_request, requestsError } from '../../../store/actions/requests';
import { setReceiver } from '../../../store/actions/chat';
import Loading from "../../LoadingComponent"
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
    change:(token,id,request)=>dispatch(change_request(token,id,request)),
    setId:(id)=>dispatch(setReceiver(id))
})
class VolunteerViewGoods extends React.Component {
  constructor(props) {
    super(props);
    
  
  }
  doneGood=(id)=>{
    if (this.props.requests.request.volunteer==null) return;
    let request=this.props.requests.request;
    let good=request.goods.find(val=>val._id===id);
    good.status="Done"
    this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
      alert("Status updated")
    })

  }

  failGood=(id)=>{
    if (this.props.requests.request.volunteer==null) return;
    let request=this.props.requests.request;
    let good=request.goods.find(val=>val._id===id);
    good.status="Fail"
    this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
      alert("Status updated")
    })

  }
  acceptRequest=()=>{
    let request=this.props.requests.request;
    request.status="Accepted";
    request.volunteer=this.props.auth.user._id;
    this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
      this.props.navigation.navigate("VolunteerTabs");
    })
  }

    cancelRequest=()=>{
      let request=this.props.requests.request;
      request.status="Not active";
      request.volunteer=null;
      let goods=request.goods.map(val=>{
      
        val.status="";
      return val});
      request.goods=goods;
      this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
        this.props.navigation.navigate("VolunteerTabs");
      })
  
    }
  
    startChat=()=>{
      this.props.setId(this.props.requests.request.user.id);
      this.props.navigation.navigate("Chat");
    }

  
  render() {
    if (this.props.requests.isLoading) return (<Loading/>) 
    else

     
    return (
      <ScrollView contentContainerStyle={{height:"100%"}}>
      <View style={{flex:1,alignItems:"center",backgroundColor:"#FAFAFA"}}>
      <ThemeProvider theme={theme}>
           
            <Card title={this.props.requests.request.name} titleStyle={{color:"#569B23",fontSize:40}}  containerStyle={{backgroundColor:"white",width:"85%"}}>
            <Text style={{fontSize:20}} >Request type:Goods</Text>
            <Text style={{fontSize:20}} >Request status:{this.props.requests.request.status}</Text>
            <Text style={{fontSize:20}}>User name:{this.props.requests.request.user?this.props.requests.request.user.name:""}</Text>
            <Text style={{fontSize:20}}>User phone:{this.props.requests.request.user?this.props.requests.request.user.phone:""}</Text>
              
              
            </Card>
            <Text h3>Goods list</Text>
            {
              this.props.requests.request.goods.map((item,idx)=>(
               

                  <ListItem
                  key={idx}
                  title={item.name}
                  titleStyle={{color:"#569B23",fontSize:20,}}
                  containerStyle={{borderRadius:40,shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  
                  elevation: 5,}}
                  style={{margin:20,width:"85%",borderRadius:40}}
                  bottomDivider
                  titleStyle={{color:"#569B23",fontSize:20,}}
                  onPress={()=>this.viewRequest(item.id)}
                  subtitle={
                      <View style={{flexDirection:"row",backgroundColor:"white",}}>
                      <View  style={{flexDirection:"column",flex:10,borderRadius:30}}>
                  <Text style={{fontSize:20}}>Amount {item.amount}</Text>
                  
                  <Text style={{fontSize:20}}>Place {item.place}</Text>
                  <Text style={{fontSize:20}}>Status {item.status}</Text>
             
                      </View>
                      <Button title="OK" onPress={()=>this.doneGood(item._id)}/>
                   <Button title="Fail" onPress={()=>this.failGood(item._id)}/>
                      </View>
                     
                  }
                />

                  
              
              ))
                }
           
           
         <View style={{marginTop:30}}>
           <Button title="Accept Request" onPress={this.acceptRequest} ></Button>
           <Button title="Cancel Request" onPress={this.cancelRequest} ></Button>
           <Button title="Chat" onPress={this.startChat}></Button>
           <Button title="Cancel" onPress={()=>this.props.navigation.goBack()}></Button>
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
  },
  column:{
    flex:1,
  
  },
  textStyle:{
    color:"white",
    fontWeight:"bold"
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(VolunteerViewGoods);
