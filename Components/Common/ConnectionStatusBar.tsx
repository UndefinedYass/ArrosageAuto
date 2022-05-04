
import React, { Component, createRef, RefObject } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Dimensions, ViewStyle, StyleProp, TextStyle, Button, TouchableHighlight, KeyboardTypeOptions } from 'react-native';
import { ConditionType, Conditon, Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { Picker } from '@react-native-picker/picker';
import { ButtonMi } from "../Home/ButtonMi";

type ConnectionStatusBar_props = {
    Connected : boolean
    style?: StyleProp<ViewStyle>
}
type ConnectionStatusBar_state = {
}

const ConnectionStatusBar_style: StyleProp<ViewStyle> = {
    backgroundColor:Palette.lightsOutBlack, 
    flexDirection:"row",alignItems:"center",
    justifyContent:"flex-start",
    elevation:4
}

/**
 * 
 */
export class ConnectionStatusBar extends Component<ConnectionStatusBar_props, ConnectionStatusBar_state>{
    constructor(props:Readonly<ConnectionStatusBar_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={[ConnectionStatusBar_style,this.props.style]}>
                <SvgMi xmldata={st.error} style={{marginHorizontal:12}} ></SvgMi>
                <Text style={{color:Palette.whitePanel, flex:1,
                 fontFamily:"Roboto", 
                 fontSize:13}} >{this.props.Connected==false?"Server disconnected":""}</Text>
                  <Text style={{ marginHorizontal:12,color:Palette.app_logo_color_variant,
                 fontFamily:"Roboto", 
                 fontSize:13}} >{"RETRY"}</Text>
            </View>
        )
    }
}