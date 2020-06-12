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
      <ScrollView>
      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"dodgerblue"}}>
      <ThemeProvider theme={theme}>
              <Text h1>
              Request for goods
            </Text>
            <Card title={this.props.requests.request.name} containerStyle={{backgroundColor:"yellow"}}>
            <Text >Request status:{this.props.requests.request.status}</Text>
            <Text>User name:{this.props.requests.request.user?this.props.requests.request.user.name:""}</Text>
            <Text>User phone:{this.props.requests.request.user?this.props.requests.request.user.phone:""}</Text>
              
              
            </Card>
            
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30, borderBottomColor:"yellow",
    borderBottomWidth:2}}>
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
                  <View style={{flexDirection:"column"}}>
                  <View style={{flexDirection:"row",margin:5,alignItems:"center", justifyContent:"center",width:"100%"}}>
                  
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

                  <View style={{flexDirection:"row",margin:0,alignItems:"center", justifyContent:"center",  borderBottomColor:"yellow",
    borderBottomWidth:2}}>
                  <Button title="OK" onPress={()=>this.doneGood(item._id)}/>
                   <Button title="Fail" onPress={()=>this.failGood(item._id)}/>
                  </View>

                
                   </View>
                 
                 
                 
                )
              })
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
