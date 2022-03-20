

import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { DeviceConfig } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DeviceDefinitionCard_wraper_style : StyleProp<ViewStyle> = {
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

//todo palette
const gpio_information_color  = "hsl(195, 83%, 38%)"

type DeviceDefinitionCard_props = {
    label:string
    config:DeviceConfig
    ID: string,
    onClick:()=>void


}
type DeviceDefinitionCard_state = {


}
/**unlik DeviceCard componnent this intended for use at DevicesScreen
 * features pin num, mode, and a potential device-wise sensor pin num
*/
export default class DeviceDefinitionCard extends Component<DeviceDefinitionCard_props, DeviceDefinitionCard_state>{
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
             style={[DeviceDefinitionCard_wraper_style,{}]} >
                
                <View style={{alignItems:"center", marginRight:6, flex:0.5,maxWidth:32,alignSelf:"center"}}>
                    <SvgMi style={{width:48}}  color={Palette.inkDarkGrey} size={32} 
                    xmldata={st.eco} />
                </View> 
                <View style={[{flex:1, flexDirection:"column", alignItems:"flex-start",justifyContent:"center", alignSelf:"center"}
            ,{}]} >
                    <View style={{ flexDirection:"row",   justifyContent:"flex-start", maxWidth:"100%", alignSelf:"flex-start", overflow:"hidden",
                  }} >
                        <Text  numberOfLines={1} ellipsizeMode="tail"  style={{color:Palette.deviceLabelColor, flexShrink:1, flexWrap:"nowrap", fontFamily:"poppins",marginRight:4}} > {this.props.label}</Text>
                    </View>
                 <View  style={{flexDirection:"row",alignItems:"center",marginRight:4}} >
                 <SvgMi color={gpio_information_color} size={12} 
                    xmldata={st.label_outline} />
                    <Text style={{color:gpio_information_color,fontSize:10,marginRight:4}}> GPIO{this.props.ID}</Text>
                     </View>


                </View>
                <View style={{alignSelf:"center"}} >
                   

                </View>




            </TouchableOpacity>
        )
    }


}





















