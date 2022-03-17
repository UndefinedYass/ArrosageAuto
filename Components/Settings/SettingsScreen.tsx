

import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { ButtonMi } from '../Home/DeviceScreen';
import { AppHeader, section_header_style } from '../Home/HomeScreen';




const SettingsScreen_wraper_style : StyleProp<ViewStyle>={
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,

}
const values_text_style : StyleProp<TextStyle>={
    color:Palette.inkDarkGrey,marginHorizontal:8,marginVertical:6

}

type SettingsScreen_props = {


}
type SettingsScreen_state = {


}



export default class SettingsScreen extends Component<SettingsScreen_props, SettingsScreen_state>{
    constructor(props:Readonly<SettingsScreen_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={SettingsScreen_wraper_style} >
                <AppHeader />
                <Text  style={section_header_style} >Arduino server host &amp; port</Text>
                <Text  style={values_text_style} >198.186.43.205:6161</Text>

                <Text  style={section_header_style} >Access key (not used)</Text>
                <Text  style={values_text_style} >5f3c0d498a3246b879</Text>

                <ButtonMi caption='Sync time'
                innerTextStyle={{color:Palette.primary_2_text,textTransform:"uppercase"}}
                wrapperStyle={{backgroundColor:Palette.primary_2,paddingHorizontal:8,paddingVertical:8,borderRadius:6,alignSelf:"flex-start",marginHorizontal:6}}></ButtonMi>
            </View>
        )
    }


}

