

import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, Linking } from 'react-native';
import { Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { AppHeader, section_header_style } from '../Home/HomeScreen';




const AboutScreen_wraper_style : StyleProp<ViewStyle>={
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,

}


const values_text_style : StyleProp<TextStyle>={
    color:Palette.inkDarkGrey,marginHorizontal:8,marginVertical:6

}
const url_text_style : StyleProp<TextStyle>={
    color:"#3686a0"
    ,marginHorizontal:8,marginVertical:6

}


type AboutScreen_props = {


}
type AboutScreen_state = {


}

const prjRepo = "https://github.com/UndefinedYass/ArrosageAuto"

export default class AboutScreen extends Component<AboutScreen_props, AboutScreen_state>{
    constructor(props:Readonly<AboutScreen_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={AboutScreen_wraper_style} >
                 <AppHeader />
                <Text  style={section_header_style} >About this project</Text>
                <Text  style={values_text_style} >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

                <Text  style={[section_header_style]} >Developer: 
                
                </Text>
                <Text  style={values_text_style} >Yassine El Hanouti</Text>
                <Text  style={section_header_style} >UX/UI: </Text>
                <Text  style={values_text_style} >Yassine El Hanouti</Text>
                <Text  style={section_header_style} >Source Code: </Text>
                <TouchableOpacity activeOpacity={0.5}  onPress={()=>{Linking.openURL(prjRepo)}} >
                <Text  style={url_text_style} > {prjRepo}</Text>


                </TouchableOpacity>

                <Text> - about view here -</Text>
            </View>
        )
    }


}

