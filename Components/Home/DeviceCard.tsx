


import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { DeviceConfig } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DeviceCard_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    flexDirection:'row',
    backgroundColor:Palette.whitePanel,
   // backgroundColor:"#4b815d0a",
    minHeight:80,
    margin:8,
    marginBottom:0,
    justifyContent:"space-between",

    borderRadius:10,
    paddingHorizontal:10, paddingVertical:4,
    
    
    
}

const action_button_touchable_style : StyleProp<ViewStyle> = {
    borderRadius:6, 
}
const action_button_style : StyleProp<TextStyle> = {
    backgroundColor:Palette.primary_2,
    color:Palette.primary_2_text,
    paddingHorizontal: 8,
    paddingVertical :4,
    borderRadius:6,
    
}

type DeviceCard_props = {
    label:string
    config:DeviceConfig
    currentState:boolean
    onClick:()=>void


}
type DeviceCard_state = {


}

export default class DeviceCard extends Component<DeviceCard_props, DeviceCard_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        const auto = this.props.config.mode=="automated"
        const manual = this.props.config.mode =="manual"
        return (

            <TouchableOpacity activeOpacity={0.5} onPress={this.props.onClick}
             style={[DeviceCard_wraper_style,{}]} >
                
                <View style={{alignItems:"center", marginRight:6, flex:0.5,maxWidth:32,alignSelf:"center"}}>
                    <SvgMi style={{width:48}}  color={Palette.inkDarkGrey} size={32} 
                    xmldata={st.eco} />
                </View> 
                <View style={[{flex:1, flexDirection:"column", alignItems:"flex-start",justifyContent:"center", alignSelf:"center"}
            ,{}]} >
                    <View style={{ flexDirection:"row",   justifyContent:"flex-start", maxWidth:"100%", alignSelf:"flex-start", overflow:"hidden",
                  }} >
                        <Text  numberOfLines={1} ellipsizeMode="tail"  style={{color:Palette.deviceLabelColor, flexShrink:1, flexWrap:"nowrap", fontFamily:"poppins",marginRight:4}} > {this.props.label}</Text>
                        <DeviceState state={this.props.currentState} overrideStyle={{marginRight:4,alignSelf:"center"}}/>
                    </View>
                    {auto&&<Text style={{color:"#616161",fontFamily:"poppins",marginRight:4}} > - Next action note -</Text>
}

                </View>
                <View style={{alignSelf:"center"}} >
                    {manual&&<TouchableHighlight underlayColor={"transparent"} style={action_button_touchable_style} onPress={()=>{}} >
                    <Text style={action_button_style} > START</Text>
                       
                    </TouchableHighlight>}

                </View>




            </TouchableOpacity>
        )
    }


}











//TODO move to palette
const on_color = Palette.deviceStateTagOn
const off_color = Palette.deviceStateTagOFF

const DeviceState_style : StyleProp<TextStyle> = {

    borderColor:on_color,
    color:on_color,
    borderRadius:3,
    borderWidth:1,
    textAlign:"center", textAlignVertical:"center",
    height:20,
    paddingHorizontal:6,
    alignSelf:"flex-start"
}


export class DeviceState extends Component<{state:boolean,overrideStyle?:StyleProp<ViewStyle>}>{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <Text style={[DeviceState_style,{color:this.props.state?on_color:off_color},this.props.overrideStyle]} >{(this.props.state?"ON":"OFF")} 
            </Text>
        )
    }
}





