


import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import ClientUtils, { ConfigMode, DeviceConfig } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { ButtonMi } from './DeviceScreen';
import { DeviceState } from './DeviceState';




const DeviceCard_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    flexDirection:'column',
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
    //backgroundColor:Palette.primary_2,
    color:Palette.primary_2_text,
    paddingHorizontal: 8,
    paddingVertical :4,
    borderRadius:6,
}

type DeviceCard_props = {
    label:string
    //config:DeviceConfig
    deviceID : string
    mode:ConfigMode
    currentState:boolean
    onClick:()=>void
    //**used when an action is trggered from the embedded in-card controls such as start/stop */
    requestRefresh:()=>void


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
        const auto = this.props.mode == "automated"
        const manual = this.props.mode == "manual"
        const deviceState = this.props.currentState;
        return (
            <TouchableHighlight underlayColor={"#f5f5f5"} activeOpacity={0.5} onPress={this.props.onClick}
                style={[DeviceCard_wraper_style, { elevation: 1, marginBottom: 2, marginTop: 4 }]} >
                    <View>
                <View style={{ flexDirection: "row", flex:1, minHeight:60, alignSelf: "stretch", alignItems: "stretch" }}>
                    {false&&<Text style={{position:"absolute", backgroundColor:Palette.inkDarkGrey, 
                    color:Palette.lightHouse,paddingHorizontal:4,borderRadius:2, fontSize:11,
                     right:-14,top:4}} 
                    >AUTO</Text>}
                 
                    <View style={{ alignItems: "center", marginRight: 6, flex: 0.5, maxWidth: 32, alignSelf: "center" }}>
                        <SvgMi style={{ width: 48 }} color={Palette.inkDarkGrey} size={32}
                            xmldata={st.eco} />
                    </View>
                    <View style={[{ flex: 1, flexDirection: "column", alignItems: "flex-start", justifyContent: "center", alignSelf: "center" }
                        , {}]} >
                        <View style={{
                            flexDirection: "row", justifyContent: "flex-start", maxWidth: "100%", alignSelf: "flex-start", overflow: "hidden",
                        }} >
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: Palette.deviceLabelColor, flexShrink: 1, flexWrap: "nowrap", fontFamily: "poppins", marginRight: 4 }} > {this.props.label}</Text>
                        </View>
                           

                    </View>
                    <View style={{ alignSelf: "center" }} >
                    {manual&&!deviceState&& <ButtonMi
                        innerTextStyle={action_button_style} 
                        underlayColor={Palette.primary_2_brighter}
                        wrapperStyle={[{backgroundColor:Palette.primary_2,},
                            action_button_touchable_style]}
                             caption="START" 
                             isdisabled={deviceState}
                             onClick={()=>{
                                this.setState({deviceState:true},()=>{
                                    requestAnimationFrame(()=>{
                                        ClientUtils.SetDeviceState(this.props.deviceID,true)
                                        .then((res)=>{this.setState({deviceState:res});
                                    
                                        this.props.requestRefresh();
                                    })

                                    })
                                   
                                    
                                })
                            }} 
                             />}
                        {auto&&<SvgMi  color='#515151' style={{
                     
                    paddingHorizontal:4,}}  xmldata={st.autoMi} size={48} />}

                    </View>
                    {manual&&deviceState&&<ButtonMi
                        innerTextStyle={action_button_style} 
                        underlayColor={Palette.lavaRed_brighter}
                        wrapperStyle={[{backgroundColor:Palette.lavaRed,},action_button_touchable_style]}
                             caption="STOP" 
                             isdisabled={!deviceState}
                             onClick={()=>{
                                this.setState({deviceState:false},()=>{
                                    requestAnimationFrame(()=>{
                                        ClientUtils.SetDeviceState(this.props.deviceID,false)
                                        .then((res)=>{
                                            this.setState({deviceState:res})
                                        
                                            this.props.requestRefresh();
                                        })

                                    })
                                   
                                    
                                })
                            }} 
                             />}
                </View>

                <View style={{
                    borderTopWidth: 1,
                    height: 30, borderTopColor: "#e4e4e7",
                    alignSelf: "stretch", alignItems: "center", 
                    justifyContent:"space-between",
                    flexDirection:"row"
                }} >
                    <DeviceState state={this.props.currentState} overrideStyle={{ marginRight: 4, alignSelf: "center" }} />

                    {auto && <View style={{flexDirection:"row", alignItems:"center"}}> 
                                <SvgMi  size={12} color={"#232323"} xmldata={st.scheduleMi}></SvgMi>

                                <Text style={{ color: "#515151", fontSize: 12,  includeFontPadding:false,
                                fontFamily: "Roboto", fontStyle:"normal", fontWeight:"100", marginRight: 4, marginLeft:4 }}
                                 >Starts in 7 h, 32 min</Text>
                                 </View>
                            }
                </View>

                </View>
            </TouchableHighlight>
        )
    }


}














