/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


//import { StatusBar } from 'expo-status-bar';
import React, { Component, createRef ,RefObject} from 'react';
import {ARTText,TouchableHighlight,PanResponder, Animated, Easing,ScrollView,TouchableOpacity, StyleSheet, Text, View, Platform,StatusBar, TextInput, FlatList, Image, Modal, Switch,AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions } from 'react-native';
import TabBar from './Common/TabBar';
//import { Palette } from './Common/theme';


import { Palette } from './Common/theme';
import  Header  from './Header/Header';
import HomeScreen from './Home/HomeScreen';
import DevicesScreen from './DevicesManager/DevicesScreen';
import SettingsScreen from './Settings/SettingsScreen';
import AboutScreen from './Settings/AboutScreen';
import ClientUtils from '../Services/ClientUtils';
















export  default class App extends Component {

  constructor(props){
   
    super(props)
    this.state={
      currentTabIx : 0

    }
    ClientUtils.cache.dhtLastResponse.readings.temp=0;
    

  }



  hanldeTabChange(ix){

    this.setState({currentTabIx:ix})

  }
  currentScreen(tabIx){
    switch (tabIx){
      case 0 :
        return <HomeScreen />
        break;
      case 1 : return <DevicesScreen />
        break;
      case 2 : return <SettingsScreen />
        break;
      case 3 : return <AboutScreen />
        break;
                  
    }
  }

  render(){

  
   return (
    <View  style={ styles.container}  >
      

      {this.currentScreen(this.state.currentTabIx)}
      <TabBar onChange={this.hanldeTabChange?.bind(this)} itemsSelectedColor={Palette.primary_2} selected={this.state.currentTabIx}  itemsSelectedTextColor={Palette.primary_2}/>
    </View>
  )}
}







const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"column",
    backgroundColor: Palette.appBackground,
    margin:0,
    width:"100%", maxWidth:"100%",minWidth:"100%",
    maxHeight:"100%",
    alignContent:"flex-start",
    justifyContent:"flex-start",
    alignItems: 'center',
    fontFamily:"Poppins-Regular",
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop:  StatusBar.currentHeight }
      }),
      padding:0,
      paddingTop:0
  },
 
  text:{
    color: "#ffffff",
    fontFamily:"Poppins-Regular",

    
  },
  oneliner_footer:{
    color: "#556689",

    fontSize:9,
    marginBottom:2,
   
  },
 
  go_button:{
   marginTop: 5,
   marginEnd: 3,
   fontSize:8
  },
 
}

);




