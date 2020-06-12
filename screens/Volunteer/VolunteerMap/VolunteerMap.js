/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from 'react';

import { StyleSheet,  View, Dimensions,TouchableHighlight, TabBarIOSItem } from 'react-native';
import {Text,Button} from "react-native-elements";

import {connect} from "react-redux"
import MapView from 'react-native-maps';
import {get_requests_near_me} from "../../../store/actions/geo";
import {get_request} from "../../../store/actions/requests"

import Loading from "../../LoadingComponent"
const mapStateToProps=state=>({
  auth:state.auth,
  geo:state.geo,
  requests:state.requests,
  

});

const mapDispatchToProps=(dispatch)=>({
    
    get_rq:(token)=>dispatch(get_requests_near_me(token)),
    view:(token,id)=>dispatch(get_request(token,id)),
    
})
class VolunteerMap extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      requests:[
      ]
    }
    console.log(this.props.auth.user.location);
  
  }
  componentDidMount(){
    this.props.get_rq(this.props.auth.token).then((resp)=>{
      if (this.props.geo.requests_near.length>0)
      {
        
        
        this.setState({
          requests:this.props.geo.requests_near
        })
      }
      
    })
  }
  markerClick=(id)=>{
   
    let req=this.props.geo.requests_near.find(val=>val._id===id);
  
    
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


  render() {
    if (this.props.geo.isLoading) return (<Loading/>) 
    else
    return (
        <View style={styles.container}>
            <Text h1>
               Volunteer map
            </Text>
         
            <MapView style={styles.mapStyle}
            
            
        
            
            >
              {
                
                this.state.requests.map(val=>{
                  return (
                    <MapView.Marker 
                    title={val.name} 
                    coordinate={{
                      latitude:val.location.coordinates[1]+Math.random()/10000,
                      longitude:val.location.coordinates[0]+Math.random()/10000
                    }}
                    onCalloutPress={()=>this.markerClick(val._id)}
                    >
                    <MapView.Callout 
                    tooltip
                    style={{backgroundColor:"dodgerblue"}}
                    >
                                      <TouchableHighlight  underlayColor='#dddddd'>
                                          <View >
                                            <Text style={{color:"yellow",fontSize:30}}>
                                              Type:{val.isGoods?"goods":
                                            val.isDelivery?"delivery":
                                            val.isService?"service":  
                                            val.isMoney?"money":""}</Text>
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


export default connect(mapStateToProps,mapDispatchToProps)(VolunteerMap);
