
import React, { Component, createRef, RefObject } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Dimensions, ViewStyle, StyleProp, TextStyle, Button, TouchableHighlight, KeyboardTypeOptions } from 'react-native';
import { ConditionType, Conditon, Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { Picker } from '@react-native-picker/picker';
import { ButtonMi } from "../Home/ButtonMi";
import { IconButtonMi } from '../Home/IconButtonMi';

type ConnectionStatusBar_props = {
    requestUserClose : ()=>void
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
                 fontSize:13}} >{this.props.Connected==false?"Server not connected":""}</Text>
                  <IconButtonMi innerSvgMiSize={16} innerSvgMiData={st.x_by_yass} 
                  color={Palette.lightHouse} hitSlop={{bottom:12,top:12,left:12,right:12}}
                  onClick={this.props.requestUserClose}
                  wrapperStyle={{ marginHorizontal:12}} ></IconButtonMi>
            </View>
        )
    }
}