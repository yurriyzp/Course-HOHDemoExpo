/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */

import React from 'react';

import {View,} from "react-native";
import { GiftedChat} from 'react-native-gifted-chat'
import {Button} from "react-native-elements";
import {baseUrl} from "../../store/actions/baseUrl";
import {connect} from "react-redux"
import { get_messages } from '../../store/actions/chat';

var io= require('socket.io-client');
var socket;

const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests,
  connected:false,
  chat:state.chat,


});

const mapDispatchToProps=dispatch=>(
  {
    get_old_messages:(token)=>dispatch(get_messages(token))
  }
)
const renderChatFooter = props => {
  return (
  <View style={{justifyContent:"center", alignItems:"center"}}>
      
      <Button title="Go Back" onPress={()=>{
        socket.emit("disconnect");
        props.navigation.goBack();
      }
        }></Button>
      </View>
  );
};


 class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
     
    }
  }
  componentDidMount=()=> {
    let obj=this;
    this.props.get_old_messages(this.props.auth.token).then(res=>{
        
      obj.setState({
        messages:this.props.chat.messages
      });
        }
    ).catch(err=>alert(err))

  socket = io.connect(baseUrl.substr(0,baseUrl.length-1), {
      extraHeaders: { Authorization: `Bearer ${this.props.auth.token}` },
  
    });
   
    

      socket.on('connect', function(){
        //console.log("connected")
      });
  
      socket.on('incMessage', function(message){
        obj.setState(state=>{
          const messages=[...state.messages,message]
          return {
            messages
          }
        })
          
      })

      
  
      socket.on('disconnect', function(){
       //console.log("disconnected")
      });
    }
  componentWillUnmount=()=>{
    socket.emit("disconnect");
  }





   
  

  onSend=(message)=> {
   
      
 
    socket.emit('send', {
      
     _id: this.props.auth.user.role=="Volunteer"?
      this.props.requests.request.user._id:
      this.props.requests.request.volunteer._id
    },message
   

    )
  }




    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={message => this.onSend(message[0])}
          user={{
            _id:this.props.auth.user._id,
            name:this.props.auth.user.name
            
          } 
          }
          renderChatFooter={props => renderChatFooter(this.props)}
          />
      )
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Chat);
