

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

/**only usedin about vies (veertically stackes key,values) */
const values_text_style : StyleProp<TextStyle>={
    color:Palette.inkDarkGrey,marginHorizontal:8,
    marginBottom:6,
    marginTop:2

}
const url_text_style : StyleProp<TextStyle>={
    color:"#3686a0"
    ,marginHorizontal:8,marginVertical:6

}


/**
 * used in info view ("version", "developer" and such)
 */
 export const minor_header_style : StyleProp<TextStyle> = {
    fontSize:14,
    fontWeight:"bold",
    color:'#3d474b',
    marginLeft:10,
    fontFamily:"Roboto",
    marginHorizontal:8,
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
                <Text  style={section_header_style} >About this app</Text>
{              false&&  <Text  style={values_text_style} >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
}                
<Text  style={values_text_style} >this app is a part of an arduino-based automatique watering IoT project by Yassin El Hanouti, university sidi mohemed ben abdellah Fes. 
{'\n'}more details on the project including the server-side source code can be found here.</Text>


                <Text  style={[minor_header_style]} >Version: </Text>
                <Text  style={values_text_style} >0.1.2-alpha</Text>
                <Text  style={[minor_header_style]} >Developer: </Text>
                <Text  style={values_text_style} >Yassine El Hanouti</Text>
                <Text  style={minor_header_style} >UX/UI: </Text>
                <Text  style={values_text_style} >Yassine El Hanouti</Text>
                <Text  style={minor_header_style} >Source Code: </Text>
                <TouchableOpacity activeOpacity={0.5}  onPress={()=>{Linking.openURL(prjRepo)}} >
                <Text  style={url_text_style} > {prjRepo}</Text>


                </TouchableOpacity>

            </View>
        )
    }


}

