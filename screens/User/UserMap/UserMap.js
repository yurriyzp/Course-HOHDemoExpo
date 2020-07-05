/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import { StyleSheet,  View, Dimensions,TouchableHighlight } from 'react-native';
import {Text,Button} from "react-native-elements";

import {connect} from "react-redux"
import MapView from 'react-native-maps';
import {get_volunteers_near_me} from "../../../store/actions/geo";
import Loading from "../../LoadingComponent"
import { setReceiver } from '../../../store/actions/chat';

const mapStateToProps=state=>({
  auth:state.auth,
  geo:state.geo,

});

const mapDispatchToProps=(dispatch)=>({
    
    get_rq:(token)=>dispatch(get_volunteers_near_me(token)),
    setId:(id)=>dispatch(setReceiver(id))
})
class UserMap extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      requests:[{
        name:"Me",
        location:{
          coordinates:[45,40]
          
          
        }
      }]
    }
  
  }
  componentDidMount(){
    this.props.get_rq(this.props.auth.token).then((resp)=>{
      if (this.props.geo.volunteers_near.length>0)
      {
        
       
        this.setState({
          requests:this.props.geo.volunteers_near
        })
      }
      
    }).catch(err=>alert(err))
  }

  markerClick=(id)=>{
    this.props.setId(id);
    this.props.navigation.navigate("UserViewVolunteer");
  }
  render() {
    if (this.props.geo.isLoading) return (<Loading/>) 
    else
    return (
        <View style={styles.container}>
            <Text h1>
               User Map
            </Text>
         
            <MapView style={styles.mapStyle}>
              {
                
                this.state.requests.map(val=>{
                  return (
                    <MapView.Marker title={val.name} 
                    coordinate={{
                      latitude:val.location.coordinates[1]+Math.random()/10000,
                      longitude:val.location.coordinates[0]+Math.random()/10000
                    }}
                    onCalloutPress={()=>this.markerClick(val._id)}
                    >
                    <MapView.Callout 
                    tooltip
                    style={{backgroundColor:"#FAFAFA"}}
                    >
                                      <TouchableHighlight  underlayColor='#dddddd'>
                                          <View >
                                            
                                          <Text style={{color:"yellow",fontSize:30}}>Name:{val.name}{"\n"}User Name:{val.user?val.user.name:""}</Text>
                                          </View>
                                      </TouchableHighlight>
                                    </MapView.Callout>
                    </MapView.Marker>

                   
                  )
                })
              }
            </MapView>
            <Button title="Cancel" onPress={()=>this.props.navigation.goBack()}></Button>
            
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.7,
  },
});


export default connect(mapStateToProps,mapDispatchToProps)(UserMap);
