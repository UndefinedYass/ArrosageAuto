


import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DeviceCard_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    flexDirection:'row',
    backgroundColor:"#d6e0da",
    minHeight:80,
    margin:8,
    borderRadius:24,
    paddingHorizontal:10, paddingVertical:4

    
}

const action_button_touchable_style : StyleProp<ViewStyle> = {
   
    borderRadius:6,
    
}
const action_button_style : StyleProp<TextStyle> = {
    backgroundColor:Palette.primary_2,
    color:Palette.primary_2_text,
    paddingHorizontal: 8,
    paddingVertical :4,
    borderRadius:6,
    
}

type DeviceCard_props = {
    label:string


}
type DeviceCard_state = {


}

export default class DeviceCard extends Component<DeviceCard_props, DeviceCard_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        return (

            <View style={DeviceCard_wraper_style} >
                <View style={{flex:1, flexDirection:"column", alignSelf:"center"}} >
                    <Text style={{color:"#15294f"}} > {this.props.label}</Text>
                    <Text style={{color:Palette.primary}} > -state-</Text>

                </View>
                <View style={{alignSelf:"center"}} >
                    <TouchableHighlight underlayColor={"transparent"} style={action_button_touchable_style} onPress={()=>{}} >
                    <Text style={action_button_style} > START</Text>
                       
                    </TouchableHighlight>

                </View>




            </View>
        )
    }


}


