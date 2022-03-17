

import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DevicesScreen_wraper_style : StyleProp<ViewStyle>={
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,

}

type DevicesScreen_props = {


}
type DevicesScreen_state = {


}

export default class DevicesScreen extends Component<DevicesScreen_props, DevicesScreen_state>{
    constructor(props:Readonly<DevicesScreen_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={DevicesScreen_wraper_style} >
               <Text> - devices view here -</Text>
            </View>
        )
    }


}

