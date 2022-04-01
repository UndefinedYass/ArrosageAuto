

import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, Button, TouchableHighlight } from 'react-native';
import { Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { AppHeader, dummyDevices, section_header_style } from '../Home/HomeScreen';
import DeviceDefinitionCard from './DeviceDefinitionCard';




const dummyDevicesAtManager : Device[] = dummyDevices


const DevicesScreen_wraper_style : StyleProp<ViewStyle>={
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,

}

const floatingAction_style : StyleProp<ViewStyle> ={
    borderRadius: 100,
    height:64,
    width:64,
    backgroundColor:Palette.primary_2, //lights out
    alignItems:"center",
    justifyContent:"center",
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation:3,

}

type DevicesScreen_props = {


}
type DevicesScreen_state = {


}

export default class DevicesScreen extends Component<DevicesScreen_props, DevicesScreen_state>{
    constructor(props: Readonly<DevicesScreen_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={DevicesScreen_wraper_style} >
                <AppHeader />
                <Text  style={section_header_style} >Devices manager</Text>
                <FlatList
                data={dummyDevicesAtManager}
                renderItem={(it=>(
                    <DeviceDefinitionCard ID={it.item.ID} label={it.item.Config.label}
                    config={it.item.Config}
                    onClick={()=>{}}
                    
                    ></DeviceDefinitionCard>
                ))}
                >

                </FlatList>
                
                <TouchableHighlight underlayColor={Palette.primary_2_brighter} style={floatingAction_style} onPress={()=>{}}  >
                    <SvgMi xmldata={st.add} size={24} />
                </TouchableHighlight>
            </View>
        )
    }


}

