


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
            <View style={{ flexDirection: "row", height: 80, justifyContent: "space-around", alignSelf: "stretch", }}>
                <SensorPanelKeyValue keyStr='Humidity' 
                value={(19).toString() /*this.props.hum.toString()*/} 
                value_unit='%'
                style={{ marginHorizontal: 4, marginLeft: 8 }}
                iconStyle={{ width: 32 }} iconSize={24}
                iconColor={"#6b90b3"} iconXmlData={st.waterDropsMi} 
                 />


                <SensorPanelKeyValue 
                keyStr='Temperature' value={this.props.temp.toString()} 
                value_unit='°C'
                style={{ marginHorizontal: 4 }} 
                iconStyle={{ width: 32 }} iconSize={32}
                iconColor={"#aa0033"} iconXmlData={st.deviceThermostat}
                />

                <SensorPanelKeyValue 
                keyStr='Illuminance' value={this.props.temp.toString()} 
                value_unit='lx'
                iconSize={32}
                style={{ marginHorizontal: 4, marginRight: 8 }} 
                iconStyle={{ width: 32 }} 
                iconColor={"#e1927a"} iconXmlData={st.wbSunny}
                />

            </View>

        )
    }
}









const SensorPanelKeyValue_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    //alignSelf:"stretch",
    flexDirection:'column',
    alignItems:"center",
    backgroundColor:Palette.whitePanel,
    justifyContent:"flex-start",
    borderRadius: 10,
    //margin:10,
    marginTop:6,
    elevation:2,
    maxHeight:82,
    

    
}

const key_text_style : StyleProp<TextStyle> = {
    color:"#666666",
    fontSize:11
}

const value_text_style : StyleProp<TextStyle> = {
    fontSize:20, fontWeight:"normal",
    minHeight:26,
    fontFamily:"Nunito-SemiBold"
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
                <Text style={[key_text_style, { alignSelf: "flex-start",margin:10,marginBottom:2,marginTop:10 }]} > {this.props.keyStr} </Text>
                <View style={{ flexDirection: "row", alignItems: "center" , minHeight:38, alignContent:"flex-start", justifyContent:"space-around", alignSelf:'stretch' }}>
                    <View style={{ alignItems: "center", maxWidth: 80, minWidth:32, marginLeft:4 }}>
                        <SvgMi style={[{ width: 48 }, this.props.iconStyle]} color={this.props.iconColor || Palette.inkDarkGrey} size={this.props.iconSize || 48} xmldata={this.props.iconXmlData} />
                    </View>

                        <Text style={[value_text_style,{minWidth:70,
                            flex:1,backgroundColor:Palette.whitePanel,color:Palette.lightsOutBlack,
                            textAlign:"center",
                            borderTopLeftRadius:32,
                            borderBottomLeftRadius:32,
                            }]} > {this.props.value} <Text style={value_unit_text_style} >
                            {this.props.value_unit}</Text> </Text>
                </View>

            </View>


        )
    }


}


