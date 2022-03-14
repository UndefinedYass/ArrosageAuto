


import React, { Component, createRef } from 'react';
import { Animated,TouchableOpacity, StyleSheet, Text, View, Platform,StatusBar, TextInput, FlatList, Image, Modal, Switch,AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import Easing from 'react-native/Libraries/Animated/src/Easing';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';

//npn




const HeaderStyle : StyleProp<ViewStyle>= {
  marginBottom:0, marginVertical:0, padding: 6, paddingHorizontal:6,
  flex:1,
  flexDirection:"row",
  maxHeight:50,
  minHeight:50,
  alignItems:"center",
  justifyContent:"space-between",
  alignSelf:"stretch",
  backgroundColor: Palette.panel,
  //borderColor: "blue",
  //borderWidth:2,
  }

  //this is more like "currentViewLableStyle"
  const AppNameStyle : StyleProp<ViewStyle>= {
    flex:4, margin:0,
    paddingHorizontal:6, backgroundColor:"transparent", 
     paddingVertical:4,
    alignSelf:"center",
  }
  const AppIconStyle : StyleProp<ViewStyle>= {
    
     margin:0, 
    paddingHorizontal:0,
     backgroundColor:"transparent", 
     alignSelf:"center",
   
  }
  /**now its version , switched it to show the title of view eg "Settings" with animation features*/
  const AppName_text_Style : StyleProp<TextStyle>= { 
    marginLeft:10,
    color: "#eee",fontWeight:"bold",
  fontSize:16, /*fontFamily:"sans-serif"*/
  }
  const headerControlsStyle : StyleProp<ViewStyle> = {
    flexDirection:"row", justifyContent:"space-between", 
    width:70,
    alignItems:"center", alignContent:"center", alignSelf:"center", 
    margin:0,paddingHorizontal:6, paddingVertical:0
  }

  type Header_props={
    searchPressed?:()=>void
    menuPressed?:()=>void
    
  }
  type Header_state={
    opacAnime:any

  }

export default class Header extends Component<Header_props,Header_state>{
    constructor(props){
      super (props)
      this.state={
        opacAnime:null
      }
      this.handleOnMenuPress=this.handleOnMenuPress.bind(this)
      this.handleOnSearchPress=this.handleOnSearchPress.bind(this)
    }

//called by app parent passing the scolling animated 
  
pushAnimatedRef(i){

  if(i){
    this.setState({opacAnime:i})
  }
}
    handleOnSearchPress(){
      this.props.searchPressed&&this.props.searchPressed()

    }
    handleOnMenuPress(){
      this.props.menuPressed&&this.props.menuPressed()

//{translateX:this.state.opacAnime?.interpolate({inputRange:[0,1],outputRange:[0,100],easing:Easing.ease})||8}
    }
  
    render(){
      return (
  
      <View style = {HeaderStyle}>

          {false&&<View  style={AppIconStyle} >
              <SvgMi xmldata={st.menu} height={24} width={24} 
               color={"#EEEEEE"}  ></SvgMi>
          </View>}
          
          <View style={{flex:1,
              alignSelf:"center",backgroundColor:"transparent"}} key="wraps animable things">
         
          {<View style={{alignSelf:"flex-start"}} >
              {true&&<Text style={{color:"#eee",fontSize:16,
            fontWeight:"bold"}} >Arrosage Automatique</Text>}
          </View >}

          </View>
         


          <View  style={headerControlsStyle} >
            <TouchableOpacity onPress={this.handleOnSearchPress} hitSlop={{left:10,right:10,top:10,bottom:10}} >
            <SvgMi xmldata={st.search } height={24} width={24} color="#eee" ></SvgMi>

            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleOnMenuPress}  hitSlop={{left:10,right:10,top:10,bottom:10}} >
            <SvgMi xmldata={st.menu } height={24} width={24} color="#eee" ></SvgMi>

            </TouchableOpacity>
          
          </View>
         

         {/*  <View  style={{margin:0,backgroundColor:"#2c2c2c",paddingHorizontal:6, paddingVertical:4}} >
              <Text style={{ color: "slategrey",}} >Settings</Text>
          </View> */}
          
        </View>
      )
    }
  
  
  }
  
  
  