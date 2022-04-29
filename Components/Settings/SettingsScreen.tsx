

import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, Pressable, ToastAndroid } from 'react-native';
import ClientUtils, { Device } from '../../Services/ClientUtils';
import { GPTextFieldDlg } from '../Common/GPDurationPickerMi';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { ButtonMi } from "../Home/ButtonMi";
import { AppHeader, section_header_style } from '../Home/HomeScreen';




const SettingsScreen_wraper_style : StyleProp<ViewStyle>={
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,

}
const values_text_style : StyleProp<TextStyle>={
    color:Palette.inkDarkGrey,marginHorizontal:8,marginVertical:6

}

type SettingsScreen_props = {


}
type SettingsScreen_state = {

    _gptf_title?:string
    _gptf_initial_text?:string
    _gptf_open?:boolean
    _gptf_done_cb?:(text:string)=>void
    _gptf_cancel_cb?:()=>void


}



export default class SettingsScreen extends Component<SettingsScreen_props, SettingsScreen_state>{
    constructor(props:Readonly<SettingsScreen_props>) {
        super(props)
        this.state = {
            _gptf_open:false,

        }
    }

    /**
     * imperative api for the GPTextFieldDlg component,
     * @param initialText 
     * @param cb 
     */
    openGPTextFieldDlg(initialText:string,title:string,cb:(result: string|null)=>void){
        this.setState({_gptf_initial_text:initialText, 
            _gptf_done_cb:(res)=>{cb(res);this.setState({_gptf_open:false})},
            _gptf_cancel_cb:()=>{this.setState({_gptf_open:false})},
            _gptf_title:title,
            _gptf_open:true,
        
        })
    }
    render() {
        return (
            <View style={SettingsScreen_wraper_style} >
                <AppHeader />
                {/*modal and sub wrapers' styles are copied from the ones at autoOptions, todo incapsulate */}
                <Modal onRequestClose={(()=>{this.setState({_gptf_open:false})}).bind(this)} transparent 
                style={{height:"100%"}}  visible={this.state._gptf_open}>
                    <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#00000080',height:"100%",
                     alignContent:"center",justifyContent:"center", flexDirection:"column",alignItems:"center"}} 
                      onPressOut={(()=>{this.setState({_gptf_open:false})}).bind(this)} >
                        <TouchableOpacity activeOpacity={1} style={{}}  onPressIn={()=>{}} >
                        <GPTextFieldDlg 
                        onCancel={this.state._gptf_cancel_cb}  
                        onDone={this.state._gptf_done_cb}  
                        initialValue={this.state._gptf_initial_text}
                        Title={this.state._gptf_title}
                        />
                        </TouchableOpacity>

                    </TouchableOpacity>
                    
                </Modal>
                
                <Text  style={section_header_style} >ESP32 host &amp; port</Text>
                <Pressable android_ripple={{radius:200,color:"#aaaaaa"}}
                  onPress={()=>{ this.openGPTextFieldDlg(ClientUtils.Host,"Esp server host and port:",(r)=>{
                      ClientUtils.Host=r;
                      AsyncStorage.setItem("host",r,()=>{
                          ToastAndroid.show("Saved adddress",1000);
                      })
                    })}} 

                 >
                    
                     <Text style={values_text_style} >{ClientUtils.Host}</Text>
                 </Pressable>

                <Text  style={section_header_style} >Access key (not used)</Text>
                <Text  style={values_text_style} >5f3c0d498a3246b879</Text>

                <ButtonMi underlayColor={Palette.primary_2_brighter}
                onClick={()=>{alert("not implemented yet")}} caption='Sync time'
                innerTextStyle={{color:Palette.primary_2_text,textTransform:"uppercase"}}
                wrapperStyle={{backgroundColor:Palette.primary_2,paddingHorizontal:8,paddingVertical:8,borderRadius:6,alignSelf:"flex-start",marginHorizontal:6}}></ButtonMi>
            </View>
        )
    }


}

