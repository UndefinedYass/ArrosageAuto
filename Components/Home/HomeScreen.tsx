


import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import DeviceCard from './DeviceCard';
import DHTPanel from './DHTPanel';




const homeScreen_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    backgroundColor:"#e9eef1",
    padding:4,
    
    
}

const app_title_style : StyleProp<TextStyle> = {
    fontSize:20,
    fontWeight:"bold",
    color:'#0d2247',
    marginLeft:4
}



const section_header_style : StyleProp<TextStyle> = {
    fontSize:18,
    fontWeight:"500",
    color:'#0d2247',
    marginLeft:4
}


type HomeScreen_props = {


}
type HomeScreen_state = {


}

export default class HomeScreen extends Component<HomeScreen_props, HomeScreen_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        return (

            <View style={homeScreen_wraper_style} >
                <Text style={app_title_style} >Arrosage Automatique</Text>
                <DHTPanel />
                <Text  style={section_header_style} >Devices</Text>
                <FlatList 
                data={[{key:"1",label:"DEVICE LABEL 1"},{key:"2",label:"DEVICE LABEL 2"}]}
                renderItem={(it)=>(<DeviceCard label={it.item.label} key={it.index} ></DeviceCard>)}
                ></FlatList>





            </View>
        )
    }


}


