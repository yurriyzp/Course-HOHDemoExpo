/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from "react";



import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Chat from "./screens/Chat/Chat";





//Authorization
import Login from "./screens/Login/Login";//+
import RegistrationUser from "./screens/RegistrationUser/RegistrationUser"//+
import RegistrationVolunteer from "./screens/RegistrationVolunteer/RegistrationVolunteer";//+


//User

import UserList from "./screens/User/UserList/UserList";//+
import UserMap from "./screens/User/UserMap/UserMap";
import UserViewVolunteer from "./screens/User/UserViewVolunteer/UserViewVolunteer";


import UserAddRequest from "./screens/User/UserAddRequest/UserAddRequest";//+
import UserDeliveryHelp from "./screens/User/UserDeliveryHelp/UserDeliveryHelp";//+
import UserGoodsHelp from "./screens/User/UserGoodsHelp/UserGoodsHelp";//+
import UserMoneyHelp from "./screens/User/UserMoneyHelp/UserMoneyHelp";//+
import UserServiceHelp from './screens/User/UserServiceHelp/UserServiceHelp';//+

import UserViewDelivery from "./screens/User/UserViewDelivery/UserViewDelivery";//+
import UserViewGoods from "./screens/User/UserViewGoods/UserViewGoods";//+
import UserViewMoney from "./screens/User/UserViewMoney/UserViewMoney";//+
import UserViewService from "./screens/User/UserViewService/UserViewService";//+




//Volunteer
import VolunteerList from "./screens/Volunteer/VolunteerList/VolunteerList";//+
import VolunteerMap from "./screens/Volunteer/VolunteerMap/VolunteerMap";

import VolunteerViewDelivery from "./screens/Volunteer/VolunteerViewDelivery/VolunteerViewDelivery";
import VolunteerViewGoods from "./screens/Volunteer/VolunteerViewGoods/VolunteerViewGoods";
import VolunteerViewMoney from "./screens/Volunteer/VolunteerViewMoney/VolunteerViewMoney";
import VolunteerViewService from "./screens/Volunteer/VolunteerViewService/VolunteerViewService";







import {connect} from 'react-redux'
const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();

function User(){
    return (
      <Stack.Navigator mode="modal" screenOptions={{
        headerShown: false
      }}>
           
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Chat" component={Chat} />
            
            <Stack.Screen name="UserAddRequest" component={UserAddRequest}/>
            <Stack.Screen name="UserDeliveryHelp" component={UserDeliveryHelp}/>
            <Stack.Screen name="UserGoodsHelp" component={UserGoodsHelp}/>
            <Stack.Screen name="UserMoneyHelp" component={UserMoneyHelp}/>
            <Stack.Screen name="UserServiceHelp" component={UserServiceHelp}/>

            <Stack.Screen name="UserViewDelivery" component={UserViewDelivery}/>
            <Stack.Screen name="UserViewGoods" component={UserViewGoods}/>
            <Stack.Screen name="UserViewMoney" component={UserViewMoney}/>
            <Stack.Screen name="UserViewService" component={UserViewService}/>
            <Stack.Screen name="UserViewVolunteer" component={UserViewVolunteer}/>




            
            </Stack.Navigator>
          
    )
  }
  function Volunteer(){
    return (
      <Stack.Navigator mode="modal" screenOptions={{
        headerShown: false
      }}>
        
            <Stack.Screen name="VolunteerList" component={VolunteerList} />
            <Stack.Screen name="Chat" component={Chat} />
            
            <Stack.Screen name="VolunteerViewDelivery" component={VolunteerViewDelivery} />
            <Stack.Screen name="VolunteerViewGoods" component={VolunteerViewGoods} />
            <Stack.Screen name="VolunteerViewMoney" component={VolunteerViewMoney} />
            <Stack.Screen name="VolunteerViewService" component={VolunteerViewService} />

            </Stack.Navigator>
          
    )
  }
  
  
  function UserTabs(){
    return (
      <Tab.Navigator >
          <Tab.Screen name="UserTab" component={User} options={{title:"Requests"}}/>
          <Tab.Screen name="UserMap" component={UserMap} options={{title:"Volunteers near me"}} />
        
          </Tab.Navigator>
    )
  }
  
  function VolunteerTabs(){
    return (<Tab.Navigator >
    <Tab.Screen name="VolunteerTab" component={Volunteer} options={{title:"Requests"}}/>
    <Tab.Screen name="VolunteerMap" component={VolunteerMap} options={{title:"Orders near me"}}/>
  
    </Tab.Navigator>)
  }
  
  
  

const Navigation = (props) => {




 

  return(
<>
 
    <Stack.Navigator mode="modal" screenOptions={{
    headerShown: false
  }}>
       
          {(props.auth.isAuthenticated==true && props.auth.user.role=="User")? (
            <>
              <Stack.Screen name="UserTabs" component={UserTabs} ></Stack.Screen>
              <Stack.Screen name="User" component={User} ></Stack.Screen>
              </>
          ):
          (props.auth.isAuthenticated==true && props.auth.user.role=="Volunteer")?
          (<>
            <Stack.Screen name="VolunteerTabs" component={VolunteerTabs} ></Stack.Screen>
            <Stack.Screen name="Volunteer" component={Volunteer} ></Stack.Screen>
            </>
          )
          :
          (
            <>
            <Stack.Screen name="Login" component={Login} ></Stack.Screen>
         <Stack.Screen name="RegistrationUser" component={RegistrationUser} ></Stack.Screen>
         <Stack.Screen name="RegistrationVolunteer" component={RegistrationVolunteer} ></Stack.Screen>
            </>
          )
          }
    
    </Stack.Navigator>
    </>

  )
}

const mapStateToProps = (state) => {
    return{
      auth:state.auth
  } 
}
export default connect(mapStateToProps, null)(Navigation);

