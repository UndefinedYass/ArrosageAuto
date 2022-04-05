


import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import ClientUtils, { ConfigMode, DeviceConfig } from '../../Services/ClientUtils';
import { FormatDuration, p_diff } from '../../Services/Common/Utils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { ButtonMi } from "./ButtonMi";
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
    justifyContent:"center",

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

    nextActionNotice?:string
    deviceState?:boolean
}

export default class DeviceCard extends Component<DeviceCard_props, DeviceCard_state>{
    constructor(props) {
        super(props)
        this.state = {

        }
        this.updateNextActionNotice = this.updateNextActionNotice.bind(this)

    }
    intv:any
    componentDidMount(): void {
        this.intv= setInterval(()=>{
            this.updateNextActionNotice();

        },1000)
    }

    componentWillUnmount(): void {
        clearInterval(this.intv)
    }

   updateNextActionNotice(){
       let accuracy = 1; //1 for minuts, the current behaviioud is not optimized since it uses second interval anyway

       let d = ClientUtils.cache.Devices.find(d=>d.ID==this.props.deviceID);
       if(!d)return;
       
       
       let p = d.Config.autoOptions.repeatEvery*1000;
       let o = Math.floor(d.Config.autoOptions.startsAt.getTime()%p);
       let o_stop = Math.floor((d.Config.autoOptions.startsAt.getTime()+(d.Config.autoOptions.duration*1000))%p);
       let x  = Math.floor(Date.now());

       let left_millis = (p_diff(p,o,x));
       let left_millis_stop = (p_diff(p,o_stop,x));
       let action = "Starts"
       if(left_millis<left_millis_stop){

       }
       else{
            left_millis= left_millis_stop;
            action= "Stops"
       }
       accuracy = left_millis>1*60*1000? 1 : 0; //starts showing seconds under 3min
       if(left_millis<=0){
        this.setState({nextActionNotice:"-"})
        return

       }
       let v = FormatDuration(Math.floor(left_millis/1000),accuracy).join(" ");
       let notice =  `${action}  in ${v}`

       this.setState({nextActionNotice:notice})
   }

    render() {
        const auto = this.props.mode == "automated"
        const manual = this.props.mode == "manual"
        const none = this.props.mode == "none"
        const deviceState = this.props.currentState;
        return (
            <TouchableHighlight underlayColor={"#f8f9fd"} activeOpacity={0.5} onPress={this.props.onClick}
                style={[DeviceCard_wraper_style, { elevation: 1, marginBottom: 2, marginTop: 4, minHeight:(none?66:80), }]} >
                    <View>
                <View style={{ flexDirection: "row", opacity:none?0.4:1 , flex:1, minHeight:60, alignSelf: "stretch", alignItems: "stretch" }}>
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
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: Palette.deviceLabelColor, flexShrink: 1, flexWrap: "nowrap", fontFamily: "poppins", marginRight: 4 }} > {this.props.label} {none&&"(Disabled)"}</Text>
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

                {!none&& <View style={{
                    borderTopWidth: 1,
                    height: 30, borderTopColor: "#e4e4e7",
                    alignSelf: "stretch", alignItems: "center", 
                    justifyContent:"space-between",
                    flexDirection:"row"
                }} >
                    <DeviceState state={this.props.currentState} overrideStyle={{ marginRight: 4, alignSelf: "center" }} />

                    {auto && this.state.nextActionNotice &&<View style={{flexDirection:"row", alignItems:"center"}}> 
                                <SvgMi  size={12} color={"#232323"} xmldata={st.scheduleMi}></SvgMi>

                                <Text style={{ color: "#515151", fontSize: 12,  includeFontPadding:false,
                                fontFamily: "Roboto", fontStyle:"normal", fontWeight:"100", marginRight: 4, marginLeft:4 }}
                                 >{this.state.nextActionNotice}</Text>
                                 </View>
                            }
                </View>}

                </View>
            </TouchableHighlight>
        )
    }


}














