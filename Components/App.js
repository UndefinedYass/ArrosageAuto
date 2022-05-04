/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


//import { StatusBar } from 'expo-status-bar';
import React, { Component, createRef ,RefObject} from 'react';
import {ARTText,TouchableHighlight,PanResponder, Animated,
   Easing,ScrollView,TouchableOpacity, StyleSheet, Text, View,
    Platform,StatusBar, TextInput, FlatList, Image, Modal, Switch, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions } from 'react-native';
import TabBar from './Common/TabBar';
import AsyncStorage from '@react-native-community/async-storage';

//import { Palette } from './Common/theme';


import { Palette } from './Common/theme';
import  Header  from './Header/Header';
import HomeScreen from './Home/HomeScreen';
import DevicesScreen from './DevicesManager/DevicesScreen';
import SettingsScreen from './Settings/SettingsScreen';
import AboutScreen from './Settings/AboutScreen';
import ClientUtils from '../Services/ClientUtils';
import { ConnectionStatusBar } from './Common/ConnectionStatusBar';
















export  default class App extends Component {

  constructor(props){
   
    super(props)
    this.state={
      currentTabIx : 0,
      currentTemp : 0,
      currentHum : 0,
      devicesCollectionCompact: [],
      connected : true,


    }
    //ClientUtils.cache.dhtLastResponse.readings.temp=0;
    

  }



  componentDidMount(){
    AsyncStorage.getItem('host',(err,host)=>{
      if (host !== null) {
          ClientUtils.Host = host;
      }
     
      ClientUtils.Connect().then((succ)=>{
        ClientUtils.GetDevicesHeadersWs().then(hs=>{
          this.setState({ devicesCollectionCompact:hs })
 
        });
      });

      ClientUtils.WS.on("closed",this.handleWSclosed.bind(this))
      ClientUtils.WS.on("open",this.handleWSOpen.bind(this))
      ClientUtils.WS.on("ldr-update",this.handleLdrUpdate.bind(this),"app")
      ClientUtils.WS.on("dht-update",this.handleLdrUpdate.bind(this),"app")
      ClientUtils.WS.on("DevicesList-update",this.handleLdrUpdate.bind(this),"app")
      
     
      
    
  });
  }

   
  handleWSclosed() {
    this.setState({ connected:false})
    if(!this.reconnecting_intv_hndl)
    this.reconnecting_intv_hndl = setInterval(() => {
      console.log("attempt reconnecting ..")
      ClientUtils.Connect().then(succ=>{
        if(succ){
          clearInterval(this.reconnecting_intv_hndl)
          ClientUtils.GetDevicesHeadersWs().then(hs=>{
            this.setState({ devicesCollectionCompact:hs })
   
          });
        }
      });
    }, 500);
  }
  handleWSOpen() {
    clearInterval(this.reconnecting_intv_hndl)
    this.setState({ connected:true})
  }
  handleLdrUpdate(json) {
    this.setState({ currentTemp: JSON.parse(json).value })
  }
  handleDHTUpdate(json) {
    this.setState({ currentHum: JSON.parse(json).hum })
  }
  handleDevcesListUpdate(json) {
    console.log("app gor devices")
    this.setState({ devicesCollectionCompact: JSON.parse(json).devices })
  }
  onRequestRefreshData(){
    ClientUtils.GetDevicesHeadersWs().then(hs=>{
      this.setState({ devicesCollectionCompact:hs })

    });
  }

  hanldeTabChange(ix){

    this.setState({currentTabIx:ix})

  }

  setDeviceState(id,newDevState){
    function transformDevice(d,id,newDevState) {
      console.log("transformong device : "+ id)
      if(d.ID==id){
        //{ID:string,label:string,currentState:boolean,mode:ConfigMode}
        return {...d, currentState:newDevState}
      }
      else return d;
    }
    this.setState((old)=>{
      let lewList = old.devicesCollectionCompact.map(d=>transformDevice(d,id,newDevState))
      let newState = {devicesCollectionCompact:lewList}
      return newState
    })
  }

  setDeviceConfig(id,newDevConfig){
    function transformDevice(d,id,newDevConfig) {
      console.log("transformong device config: "+ id)
      if(d.ID==id){
        //{ID:string,label:string,currentState:boolean,mode:ConfigMode}
        return {...d,mode:newDevConfig.mode } 
      }
      else return d;
    }
    this.setState((old)=>{
      let lewList = old.devicesCollectionCompact.map(d=>transformDevice(d,id,newDevConfig))
      let newState = {devicesCollectionCompact:lewList}
      return newState
    })
  }
  currentScreen(tabIx){
    switch (tabIx){
      case 0 :
        return <HomeScreen devicesCollectionCompact={this.state.devicesCollectionCompact}
        currentHum = {this.state.currentHum} 
        currentTemp={this.state.currentTemp||0}
        onDeviceStateChange = {((id,newState)=>{
          this.setDeviceState(id,newState);
        }).bind(this)}
        onDeviceConfigChange= {((id,newConfig)=>{
          this.setDeviceConfig(id,newConfig);
        }).bind(this)}
        
        />
        break;
      case 1 : return <DevicesScreen devicesCollectionCompact={this.state.devicesCollectionCompact}
      requestRefreshData = {this.onRequestRefreshData.bind(this)}
      />
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
      {this.state.connected==false && <ConnectionStatusBar style={{position:"absolute",
      top:56,width:"85%",height:44
      }} Connected={this.state.connected}></ConnectionStatusBar>}
      
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




