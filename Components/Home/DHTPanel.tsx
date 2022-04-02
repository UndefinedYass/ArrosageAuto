


import React, { Component, createRef } from 'react';
import  { Animated,  ImageComponent , TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, ImageSourcePropType } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DHTPanel_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    //alignSelf:"stretch",
    flexDirection:'row',
    alignItems:"center",
    backgroundColor:Palette.whitePanel,
    justifyContent:"space-around",
    borderRadius: 10,
    //margin:10,
    marginTop:6,
    elevation:3,
    maxHeight:82,
    

    
}

type DHTPanel_props = {
    hum:number
    temp:number


}
type DHTPanel_state = {


}

export default class DHTPanel extends Component<DHTPanel_props, DHTPanel_state>{
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    render() {
       
        /**
         * initially there was only one DHTPanel_wraper_style panel featuring two key-value pairs in a row
         * and i switched to separate panels todo: refactor and rename style approprately
         */
        return (
            <View style={{flexDirection:"row", height:100,justifyContent:"space-around",alignSelf:"stretch",}}>
            <View style={[DHTPanel_wraper_style,{marginHorizontal:8,marginRight:4}]} >
                <View style={{alignItems:"center", flex:1,maxWidth:80}}>
                    <SvgMi style={{width:48}}  color={"#6b90b3"} size={48} xmldata={st.cloudCircle} />
                </View> 
                
                <DHTPanelKeyValue keyStr='Humidity' value={this.props.hum.toString()} value_unit='%'/>
                {/*<View style={{height:"62%", width:1, backgroundColor:"#66666644"}} />
                <DHTPanelKeyValue keyStr='Tempurature' value='25°C'/>*/ }
            </View>
            <View style={[DHTPanel_wraper_style,{marginHorizontal:8,marginLeft:4}]} >
                <View style={{alignItems:"center", flex:1,maxWidth:80}}>
                    <SvgMi style={{width:48}}  color={"#aa0033"} size={48} xmldata={st.deviceThermostat} />
                </View> 
                <DHTPanelKeyValue keyStr='Temperature' value={this.props.temp.toString()} value_unit='°C'/>
                {/*<View style={{height:"62%", width:1, backgroundColor:"#66666644"}} />
                <DHTPanelKeyValue keyStr='Tempurature' value='25°C'/>*/ }
            </View>
            
            
            </View>
            
        )
    }
}










const key_text_style : StyleProp<TextStyle> = {
    color:"#666666"
}

const value_text_style : StyleProp<TextStyle> = {
    fontSize:22, fontWeight:"normal",
    fontFamily:"Comfortaa-Bold"
}
const value_unit_text_style : StyleProp<TextStyle> = {
    fontSize:14, fontWeight:"normal",
    fontFamily:"Comfortaa-Regular"
}


type DHTPanelKeyValue_props = {
    keyStr:string
    value: string
    value_unit?:string
}
type DHTPanelKeyValue_state = {

}

class DHTPanelKeyValue extends Component<DHTPanelKeyValue_props, DHTPanelKeyValue_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
        return (

            <View style={{flexDirection:"column", alignItems:"center",flex:2}} >
               
                <Text style={key_text_style} > {this.props.keyStr} </Text>
                <Text style={value_text_style} > {this.props.value} <Text style={value_unit_text_style} >
                    {this.props.value_unit}</Text> </Text>
                
                




            </View>
        )
    }


}


