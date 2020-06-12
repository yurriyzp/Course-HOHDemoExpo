/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React,{Component,Text} from 'react';



import { Provider } from 'react-redux';
import Navigation from "./Navigation";
import ConfigureStore from "./store/configureStore";
import { NavigationContainer } from '@react-navigation/native';




const store=ConfigureStore();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }


  render(){



  return (
    
    <Provider store={store}>
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
    </Provider>
  );
}
}



 