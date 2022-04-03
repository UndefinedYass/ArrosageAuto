


import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, ToastAndroid } from 'react-native';
import ClientUtils, { Conditon, Device, DeviceCompact, Funcs } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import DeviceCard from './DeviceCard';
import DeviceScreen from './DeviceScreen';
import DHTPanel from './DHTPanel';


export const dummyDevices : Device[] = [
    {ID:"A2", currentState:false,Config:{
        mode:"automated",
        label:"Electrovanne #1",
        manualState:false,
        autoOptions:{
            startsAt: new Date(Date.now()),
            duration:1*3600,
            repeatEvery: 24*3600,
            conditions: []

        }
    }},
    {ID:"A28", currentState:false,Config:{
        mode:"manual",
        label:"Electrovanne #2",
        manualState:false,
        autoOptions:{
            startsAt: new Date(Date.now()),
            duration:1*3600,
            repeatEvery: 24*3600,
            conditions: []

        }
    }},
    {ID:"A22", currentState:false,Config:{
        mode:"automated",
        label:"Pomp a eau #1",
        manualState:false,
        autoOptions:{
            startsAt: new Date(Date.now()),
            duration:1*3600,
            repeatEvery: 24*3600,
            conditions: [
                {type:"gt",
                targetVar:"temp",
                param1:50,
                },
                {type:"lt",
                targetVar:"hum",
                param1:30,
                },
            ]

        }
    }},
   
]


const homeScreen_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,
    
    
    
}

//this now serves as a header panel todo rename styles
const app_title_style : StyleProp<ViewStyle> = {
    flexDirection:"row",
    minHeight:50,
    paddingVertical:8,
    paddingHorizontal:8,
    alignSelf:"stretch",
    backgroundColor:Palette.primary_2,
    elevation:6,
    marginBottom:6,
}
const app_title_text_style : StyleProp<TextStyle> = {
    fontSize:20,
    color:Palette.primary_2_text,
    //fontWeight:"bold",
    //color:'#0d2247',
    fontFamily:"Comfortaa-Bold",
    alignSelf:"center",
    includeFontPadding:false, //solved a verrtical offsset 
}


/**
 * app-wide bold black header
 */
export const section_header_style : StyleProp<TextStyle> = {
    fontSize:18,
    fontWeight:"normal",
    color:'#3d474b',
    marginLeft:10,
    fontFamily:"Poppins-Regular",
}


type HomeScreen_props = {


}
type HomeScreen_state = {

    isDeviceScreenOpen : boolean
    /**id only */
    currentDeviceScreenDevice_cmp : DeviceCompact
    devicesCollectionCompact : DeviceCompact[]
    currentHum:number,
    currentTemp:number,
    currentDhtError:string|null,

}



export default class HomeScreen extends Component<HomeScreen_props, HomeScreen_state>{
    constructor(props) {
        super(props)
        this.state = {
            isDeviceScreenOpen:false,
            currentDeviceScreenDevice_cmp:{ID:"",label:"",currentState:false,mode:"automated"},
            devicesCollectionCompact :ClientUtils.cache.DevicesHeaders,
            currentHum:ClientUtils.cache?.dhtLastResponse?.readings?.hum ,
            currentTemp:ClientUtils.cache.dhtLastResponse.readings.temp,
            currentDhtError:null,

        }
    }

    refreshData(){
        ClientUtils.GetDevicesHeaders(false).then(devicesComp=>this.setState({devicesCollectionCompact:devicesComp})).catch(err=>{
            ToastAndroid.show(`Couldn't connect to ${ClientUtils.Host}\n${err?.message}`,1000)
        });
        ClientUtils.GetSensorsInfo()
        .then(resp=>this.setState({currentHum:resp.readings.hum,currentTemp:resp.readings.temp,currentDhtError:resp.error}))
        .catch(err=>{
            ToastAndroid.show(`Couldn't connect to ${ClientUtils.Host}\n${err?.message}`,1000)
        });
    }
    componentDidMount(): void {
        this.refreshData()
    }

    
    render() {
        return (
            <View style={homeScreen_wraper_style} >
                <Modal visible={this.state.isDeviceScreenOpen} onRequestClose={(()=>{this.setState({isDeviceScreenOpen:false});this.refreshData()}).bind(this)} >
                    <DeviceScreen deviceLabel={this.state.currentDeviceScreenDevice_cmp.label} deviceState={this.state.currentDeviceScreenDevice_cmp.currentState} deviceID={this.state.currentDeviceScreenDevice_cmp.ID} 
                    
                    onBack={(()=>{this.setState({isDeviceScreenOpen:false});this.refreshData()}).bind(this)}
                    />
                </Modal>
                <AppHeader />
                <Text  style={section_header_style} >Sensor readings</Text>
                <DHTPanel hum={this.state.currentHum} temp={this.state.currentTemp} />
                <Text  style={section_header_style} >Devices</Text>
                <FlatList style={{marginBottom:6}} 
                
                getItemLayout={(data,ix)=>({length:100,offset:112*ix,index:ix})}
                data={this.state.devicesCollectionCompact.map(d=>({d:d,key:d.ID}))}
                renderItem={(it)=>(<DeviceCard mode={it.item.d.mode} deviceID={it.item.d.ID}  
                    label={it.item.d.label} requestRefresh={(()=>{this.refreshData()}).bind(this)}
                     key={Funcs.DeviceCompactHash(it.item.d)} currentState={it.item.d.currentState}
                    onClick={()=>{this.setState({isDeviceScreenOpen:true,currentDeviceScreenDevice_cmp:it.item.d})}} ></DeviceCard>)}
                ></FlatList>
            </View>
        )
    }


}




const app_title_style_variant : StyleProp<TextStyle> = {
    color: Palette.app_logo_color_variant
}

export function AppHeader() {
    return (
        <View style={app_title_style} >
            <SvgMi color='white' size={32}
                style={{ alignSelf: "center" }}
                xmldata={st.eco} />
            <Text style={app_title_text_style} >
                arrosage
                <Text style={app_title_style_variant}>
                    auto
                </Text>
            </Text>
        </View>
    )
}

