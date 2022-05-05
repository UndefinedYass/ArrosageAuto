


import React, { Component, createRef } from 'react';
import  { Animated,  ImageComponent , TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, ImageSourcePropType } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';






type SensorPanel_props = {
    hum:number
    temp:number


}
type SensorPanel_state = {


}

export default class SensorPanel extends Component<SensorPanel_props, SensorPanel_state>{
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    render() {

        /**
         * initially there was only one DHTPanel_wraper_style panel featuring two key-value pairs in a row
         * and i switched to separate panels 
         */
        return (
            <View style={{ flexDirection: "row", height: 100, justifyContent: "space-around", alignSelf: "stretch", }}>
                <SensorPanelKeyValue keyStr='Humidity' 
                value={this.props.hum.toString()} 
                value_unit='%'
                style={{ marginHorizontal: 8, marginRight: 4 }}
                iconStyle={{ width: 48 }} 
                iconColor={"#6b90b3"} iconXmlData={st.cloudCircle} 
                 />


                <SensorPanelKeyValue 
                keyStr='Temperature' value={this.props.temp.toString()} 
                value_unit='°C'
                style={{ marginHorizontal: 8, marginLeft: 4 }} iconStyle={{ width: 48 }} 
                iconColor={"#aa0033"} iconXmlData={st.deviceThermostat}
                />

            </View>

        )
    }
}









const SensorPanelKeyValue_wraper_style : StyleProp<ViewStyle> = {
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


type SensorPanelKeyValue_props = {
    keyStr:string
    value: string
    value_unit?:string
    style?: StyleProp<ViewStyle>
    iconStyle? : StyleProp<ViewStyle>
    iconSize? : number
    iconXmlData? : string
    iconColor? : string
}
type SensorPanelKeyValue_state = {

}

class SensorPanelKeyValue extends Component<SensorPanelKeyValue_props, SensorPanelKeyValue_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }//{ marginHorizontal: 8, marginRight: 4 } color={"#6b90b3"}
    render() {
        return (
            <View style={[SensorPanelKeyValue_wraper_style, this.props.style]} >
                <View style={{ alignItems: "center", flex: 1, maxWidth: 80 }}>
                    <SvgMi style={[{ width: 48 },this.props.iconStyle]} color={this.props.iconColor||Palette.inkDarkGrey} size={this.props.iconSize||48} xmldata={this.props.iconXmlData} />
                </View>
                <View style={{ flexDirection: "column", alignItems: "center", flex: 2 }} >
                    <Text style={key_text_style} > {this.props.keyStr} </Text>
                    <Text style={value_text_style} > {this.props.value} <Text style={value_unit_text_style} >
                        {this.props.value_unit}</Text> </Text>
                </View>
            </View>


        )
    }


}


