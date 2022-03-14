


import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const TabBar_wraper_style  : StyleProp<ViewStyle> = {
    height:48,
    backgroundColor:"#f6f7fb",
    alignSelf:"stretch",
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    display:"flex",
    paddingHorizontal: 8,

    
    

}


type TabBar_props = {


}
type TabBar_state = {


}

export default class TabBar extends Component<TabBar_props, TabBar_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        return (

            <View style={TabBar_wraper_style} >
                <SvgMi color='#427d5f' size={32} xmldata={st.homeRounded} />
                <SvgMi color='#585858' size={32} xmldata={st.deviceHub} />
                <SvgMi color='#585858' size={32} xmldata={st.settings} />
                <SvgMi color='#585858' size={32} xmldata={st.info} />




            </View>
        )
    }


}


