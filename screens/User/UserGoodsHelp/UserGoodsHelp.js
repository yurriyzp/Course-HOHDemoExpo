/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import {StyleSheet,View, ScrollView} from "react-native";
import {Text,Input,Button} from "react-native-elements";
import { ThemeProvider } from 'react-native-elements';
import {theme}  from "../../theme"
import {connect} from "react-redux"
import { place_request,get_requests } from '../../../store/actions/requests';

import Loading from "../../LoadingComponent"
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
    send_req:(token,name,type,goods,description,purpose,amount,ccnumber)=>dispatch(place_request(token,name,type,goods,description,purpose,amount,ccnumber)),

    get_req:(token)=>dispatch(get_requests(token)),
 
})
class UserGoodsHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      goods:[],
      name:"",
      good_name:"",
      amount:1,
      place:"",
      errMes:""
      
    }
  
  }
  changeName=(e)=>{
    this.setState({
      name:e
    })
  }
  changeGoodName=(e)=>{
    this.setState({
      good_name:e
    })
  }

  changeAmount=(e)=>{
    this.setState({
      amount:e
    })
  }

  changePlace=(e)=>{
    this.setState({
      place:e
    })
  }
  addGood=()=>{
    this.setState({
      goods:[...this.state.goods,{
        name:this.state.good_name,
        amount:this.state.amount,
        place:this.state.place
      }],
      good_name:"",
      place:"",
      amount:""

    })
  }
  send=()=>{
    
    if (this.state.name=="" || this.state.goods.length==0) 
 alert("You should fill all fields");

else

    
    this.props.send_req(
      this.props.auth.token,
      this.state.name,
      "goods",
      this.state.goods
    ).then(()=>{
      if (!this.props.requests.errMes)
    
      this.props.get_req(this.props.auth.token).
      then(()=>
      { if (!this.props.requests.errMes)
        {
          alert("ok!");
          this.props.navigation.navigate("UserList")
        }
        
        else this.setState({
          errMes:this.props.requests.errMes
        })
      })
      .catch((err)=>alert(err))
      else this.setState({
        errMes:this.props.requests.errMes
      })
    }).catch((err)=>alert(err))
      
    
  }

  render() {
    if (this.props.requests.isLoading) return (<Loading/>) 
    else

    return (
      <ScrollView>
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#FAFAFA"}}>
      <ThemeProvider theme={theme}>
            <Text h1>
              Request for goods
            </Text>
            <Text h3>{this.state.name}</Text>
            <Input
               label='Name' onChangeText={this.changeName} value={this.state.name}
            />
            <Input
                label='Good Name' onChangeText={this.changeGoodName} value={this.state.good_name}
            />
            <Input
                label='Amount' onChangeText={this.changeAmount} value={String(this.state.amount)}
            />
            <Input
                label='Where to buy' onChangeText={this.changePlace} value={this.state.place}
            />
            <Button title="Add" onPress={this.addGood}></Button>
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
            
            </View>

            
            {
              this.state.goods.map((item,idx)=>{
                return (
                  <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.name}</Text>
                  </View>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.amount}</Text>
                  </View>
                  <View style={styles.column}>
                  <Text style={styles.textStyle}>{item.place}</Text>
                  </View>

                 
                  </View>
                 
                 
                 
                 
                )
              })
            }
                
            
                
            <Button title="Send Request" onPress={this.send}></Button>
            <Button title="Cancel" onPress={()=>this.props.navigation.goBack()}></Button>
            <Text>{this.state.errMess}</Text>
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
export default connect(mapStateToProps,mapDispatchToProps)(UserGoodsHelp);
