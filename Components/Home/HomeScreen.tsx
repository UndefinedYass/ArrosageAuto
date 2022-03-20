


import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Conditon, Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import DeviceCard from './DeviceCard';
import DeviceScreen from './DeviceScreen';
import DHTPanel from './DHTPanel';


export const dummyDevices : Device[] = [
    {ID:"A2", currentState:false,Config:{
        mode:"automated",
        label:"Electrovanne #1",
        manualState:false,
        autoOptions:{
            startsAt: new Date(Date.now()),
            duration:1*3600,
            reapeatEvery: 24*3600,
            conditions: []

        }
    }},
    {ID:"A28", currentState:false,Config:{
        mode:"manual",
        label:"Electrovanne #2",
        manualState:false,
        autoOptions:{
            startsAt: new Date(Date.now()),
            duration:1*3600,
            reapeatEvery: 24*3600,
            conditions: []

        }
    }},
    {ID:"A22", currentState:false,Config:{
        mode:"automated",
        label:"Pomp a eau #1",
        manualState:false,
        autoOptions:{
            startsAt: new Date(Date.now()),
            duration:1*3600,
            reapeatEvery: 24*3600,
            conditions: [
                {type:"gt",
                targetVar:"temp",
                param1:50,
                param2:30},
                {type:"lt",
                targetVar:"hum",
                param1:30,
                param2:30},
            ]

        }
    }},
   
]


const homeScreen_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,
    
    
    
}

//this now serves as a header panel todo rename styles
const app_title_style : StyleProp<ViewStyle> = {
    flexDirection:"row",
    paddingVertical:8,
    paddingHorizontal:8,
    alignSelf:"stretch",
    backgroundColor:Palette.primary_2,
    elevation:6,
    marginBottom:6,
}
const app_title_text_style : StyleProp<TextStyle> = {
    fontSize:20,
    color:Palette.primary_2_text,
    //fontWeight:"bold",
    //color:'#0d2247',
    fontFamily:"Comfortaa-Bold",
    alignSelf:"center",
    includeFontPadding:false, //solved a verrtical offsset 
}


/**
 * app-wide bold black header
 */
export const section_header_style : StyleProp<TextStyle> = {
    fontSize:18,
    fontWeight:"normal",
    color:'#3d474b',
    marginLeft:10,
    fontFamily:"Poppins-Regular",
}


type HomeScreen_props = {


}
type HomeScreen_state = {

    isDeviceScreenOpen : boolean
    currentDeviceScreenDevice : Device

}

export default class HomeScreen extends Component<HomeScreen_props, HomeScreen_state>{
    constructor(props) {
        super(props)
        this.state = {
            isDeviceScreenOpen:false,
            currentDeviceScreenDevice:null
        }
    }
    render() {
        return (
            <View style={homeScreen_wraper_style} >
                <Modal visible={this.state.isDeviceScreenOpen} >
                    <DeviceScreen deviceState={this.state.currentDeviceScreenDevice?.currentState} deviceID={this.state.currentDeviceScreenDevice?.ID} 
                    currentConfig={this.state.currentDeviceScreenDevice?.Config}
                    onBack={(()=>{this.setState({isDeviceScreenOpen:false})}).bind(this)}
                    />
                </Modal>
                <AppHeader />
                <Text  style={section_header_style} >Sensor readings</Text>
                <DHTPanel />
                <Text  style={section_header_style} >Devices</Text>
                <FlatList style={{marginBottom:6}} 
                data={dummyDevices.map(d=>({d:d,key:d.ID}))}
                renderItem={(it)=>(<DeviceCard config={it.item.d.Config} label={it.item.d.Config.label} key={it.index}
                    onClick={()=>{this.setState({isDeviceScreenOpen:true,currentDeviceScreenDevice:dummyDevices.find(d=>d.ID==it.item.d.ID)})}} ></DeviceCard>)}
                ></FlatList>
            </View>
        )
    }


}




const app_title_style_variant : StyleProp<TextStyle> = {
    color: Palette.app_logo_color_variant
}

export function AppHeader() {
    return (
        <View style={app_title_style} >
            <SvgMi color='white' size={32}
                style={{ alignSelf: "center" }}
                xmldata={st.eco} />
            <Text style={app_title_text_style} >
                arrosage
                <Text style={app_title_style_variant}>
                    auto
                </Text>
            </Text>
        </View>
    )
}

