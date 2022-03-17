


import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, TouchableHighlight, DatePickerAndroid, Insets, ScrollView } from 'react-native';
import { ConfigMode, DeviceConfig } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import DeviceCard, { DeviceState } from './DeviceCard';
import DHTPanel from './DHTPanel';




const deviceScreen_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,
    padding:4,
    
    
}

const device_title_style : StyleProp<TextStyle> = {
    fontSize:20,
    fontWeight:"bold",
    color:'#0d2247',
    marginLeft:4,
    fontFamily:"poppins",
    alignSelf:"center"
}



const section_header_style : StyleProp<TextStyle> = {
    fontSize:18,
    fontWeight:"500",
    color:'#0d2247',
    marginLeft:4
}



const deviceScreen_style : StyleProp<ViewStyle> = {
    backgroundColor : Palette.whitePaper,
    height:"100%"
}
type DeviceScreen_props = {
    currentConfig:DeviceConfig,
    deviceID: string,
    deviceState: boolean,
    onBack:()=>void
}
type DeviceScreen_state = {
    currentConfig:DeviceConfig

}
export default class DeviceScreen extends Component<DeviceScreen_props, DeviceScreen_state>{
    constructor(props:Readonly<DeviceScreen_props>) {
        super(props)
        this.state = {
            currentConfig:props.currentConfig,
            
        }
        this.handleModeSelectionChange=this.handleModeSelectionChange.bind(this)
    }
    handleModeSelectionChange(newMode:string){
        this.setState((old)=>({currentConfig:{...old.currentConfig, mode:newMode as ConfigMode}}))

    }
    handleOptionsClick(){

    }
   
    render() {
        const auto = this.state.currentConfig.mode=="automated";
        const manual = this.state.currentConfig.mode=="manual";
        const none = this.state.currentConfig.mode=="none"

        return (

            <View style={deviceScreen_style} >
                <DeviceHeader onOptionsClick={this.handleOptionsClick} 
                onBackClick={this.props.onBack}
                title={this.state.currentConfig.label} deviceState={this.state.currentConfig.manualState} />
                
                <ScrollView contentContainerStyle={{flexGrow:1}} style={{flex:1,}}>
                <DeviceInfoSection deviceLabel={this.state.currentConfig.label} 
                devicePin={this.props.deviceID}
                deviceState={this.props.deviceState}
                onLableUpdate={()=>{}}
                />
                  <Text style={[text_options_group_style,{marginBottom:12}]} >Mode d'operation:</Text>
                <ChipsPanel onSelectionChanged={this.handleModeSelectionChange} 
                selection={this.state.currentConfig.mode} 
                options={[{id:"manual",caption:"Manual"},{id:"automated",caption:"Automated"} , {id:"none",caption:"None"}]} />
                {auto&&(
                    <AutoOptionsSection />
                )}
               
                {manual&&(
                    <View><Text >--manual control--</Text></View>
                )}
                 {none&&(
                    <View style={{alignSelf:"center",flex:1,alignItems:"center",justifyContent:"center"}}><Text style={{color:"#666666",top:"25%",position:"absolute"}} >Device is disabled</Text></View>
                )}

                </ScrollView>
                {auto&&(
                    <ButtonMi
                     wrapperStyle={{  width:"85%",height:42,alignItems:"center", justifyContent:"center",  maxWidth:230,borderRadius:100, marginBottom:16,  backgroundColor:Palette.primary_2}}
                     innerTextStyle={{color:Palette.primary_2_text}}
                     caption='SAVE CHANGES' />
                )}
                

            </View>
        )
    }
}




type DeviceHeader_props = {
    title:string,
    deviceState: boolean
    onOptionsClick:()=>void
    onBackClick:()=>void
}
type DeviceHeader_state = {

}
export  class DeviceHeader extends Component<DeviceHeader_props, DeviceHeader_state>{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flexDirection:"row",alignSelf:"stretch",alignItems:'center',paddingHorizontal:6, justifyContent:"space-between"}} >
                <IconButtonMi 
                onClick={this.props.onBackClick}
                underlayColor={'#32323230'}
                hitSlop={{bottom:16,top:16,left:16,right:36}}
                color='black' innerSvgMiData={st.chevron_left} innerSvgMiSize={24}
                wrapperStyle={{backgroundColor:'transparent', width:32,height:32, borderRadius:100}}
                />
                <View style={{flexDirection:"row", alignItems:"center", height:40,flexShrink:1 }}>
                <Text  numberOfLines={1} ellipsizeMode="tail"  style={{color:"black", flexShrink:1, marginRight:6,fontSize:16}}  > {this.props.title}</Text>
{                false&&<DeviceState state={this.props.deviceState} overrideStyle={{alignSelf:"center"}} ></DeviceState>
}
                </View> 

                <IconButtonMi 
                onClick={this.props.onOptionsClick}
                underlayColor={'#32323230'}
                hitSlop={{bottom:16,top:16,left:36,right:16}}
                color='black' innerSvgMiData={st.more_horiz} innerSvgMiSize={24}
                wrapperStyle={{backgroundColor:'transparent', width:32,height:32, borderRadius:100}}
                />
               
            </View>
        )
    }
}





type DeviceInfoSection_props = {
    deviceLabel:string,
    devicePin:string,
    deviceState: boolean
    onLableUpdate:()=>void
}
type DeviceInfoSection_state = {

}
/**
 * encapsulates the status tag and pin informaion with otential other information
 * this could have been embeded in the header component as an alternative design
 */
export  class DeviceInfoSection extends Component<DeviceInfoSection_props, DeviceInfoSection_state>{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flexDirection:"column",alignSelf:"stretch", marginHorizontal:6, marginVertical:10, padding:8, alignItems:'flex-start',backgroundColor:Palette.whitePanel, borderRadius:16,}} >
               <View style={{height:32,  flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}} >
                   <Text style={{fontSize:14}} >Pin</Text>
                   <Text style={{fontSize:14, fontWeight:"bold", marginLeft:8}} >{this.props.devicePin}</Text>
               </View>
               <View style={{height:32, flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}} >
                   <Text  style={{fontSize:14}} >Label</Text>
                   <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:14, fontWeight:"bold", marginLeft:8,flexShrink:1}} >{this.props.deviceLabel}</Text>
               </View>
               <View style={{height:32, flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}} >
                   <Text style={{fontSize:14}} >Status</Text>
                   <DeviceState state={this.props.deviceState} overrideStyle={{alignSelf:"center", marginLeft:6}} ></DeviceState>

               </View>
               
            </View>
        )
    }
}



const ChipsPanel_wrapper_style : StyleProp<ViewStyle> = {
    flexDirection:"row",
    alignItems:"center",

}

type ChipsPanel_props = {
    options: {id:string,caption:string}[]
    selection : string
    onSelectionChanged : (newSelection:string)=>void

}
type ChipsPanel_state = {

}
export  class ChipsPanel extends Component<ChipsPanel_props, ChipsPanel_state>{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (

            <View style={ChipsPanel_wrapper_style} >
                {this.props.options.map(opt=>(
                    <Chip id={opt.id} isSelected={this.props.selection===opt.id} key={opt.id} caption={opt.caption} onClick={(()=>{this.props.onSelectionChanged(opt.id)}).bind(this)} />
                ))}
                
            </View>
        )
    }
}







const chip_default_style : StyleProp<ViewStyle> = {  
    borderRadius: 100,
    height:28,
    alignItems:"center", justifyContent:"center",
    paddingHorizontal:12,
    marginHorizontal: 6,
    backgroundColor: Palette.whitePanel
}
const chip_selected_style : StyleProp<ViewStyle> = {
    backgroundColor:Palette.primary_2, 
}
const chip_default_text_style : StyleProp<TextStyle> = {
    fontSize: 14,
    color: Palette.inkDarkGrey,
    textAlignVertical: "center", textAlign:"center"
}
const chip_selected_text_style : StyleProp<TextStyle> = {
    color: Palette.primary_2_text,

}
type Chip_props = {
    id:string
    caption:string
    isSelected: boolean
    onClick : ()=>void
}
type Chip_state = {

}
export  class Chip extends Component<Chip_props, Chip_state>{
    constructor(props:Readonly<Chip_props>) {
        super(props)
        this.state = {
        }
    }
  
    
    handleClick(){
        this.props.onClick();
    }
    render() {
        const isselected =this.props.isSelected;
        return (

            <TouchableHighlight underlayColor={Palette.primary_2_opac40} onPress={this.handleClick.bind(this)} style={isselected?[chip_default_style,chip_selected_style]:chip_default_style} >
                 <Text   style={isselected?[chip_default_text_style,chip_selected_text_style]:chip_default_text_style} >{this.props.caption}</Text>
            </TouchableHighlight>
        )
    }
}





const text_options_group_style: StyleProp<TextStyle>={
    color:Palette.primary_2,
    fontSize:16,
    fontWeight:"500",
    marginLeft:6, marginVertical:4,

}
const text_option_key_style: StyleProp<TextStyle>={
    color:"#2c2c2c",
    fontSize:14,
    fontWeight:"500",
    marginLeft:10, marginVertical:4,

}
const text_option_value_style: StyleProp<TextStyle>={
    color:Palette.inkDarkGrey,
    fontSize:14,
    fontWeight:"100",    
    marginLeft:10,  marginBottom:4,
}
type AutoOptionsSection_props = {

}
type AutoOptionsSection_state = {

}
export  class AutoOptionsSection extends Component<AutoOptionsSection_props, AutoOptionsSection_state>{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (

            <View style={{marginTop:10, flexGrow:1}} >
                <Text style={text_options_group_style} >Automation options:</Text>
                 <View>
                     <Text style={text_option_key_style} >Starts at</Text>
                     <Text style={text_option_value_style} >5:00 AM 16-03-2022</Text>
                 </View>
                 <Hoz/>
                 <View>
                     <Text style={text_option_key_style}  >Duration</Text>
                     <Text style={text_option_value_style}>30 min</Text>
                 </View>
                 <Hoz/>
                 <View>
                     <Text style={text_option_key_style} >Repeat every</Text>
                     <Text style={text_option_value_style} >24 h</Text>
                 </View>
                 <Hoz/>
                 <View>
                     <Text style={text_option_key_style} >Conditions</Text>
                     <Text style={text_option_value_style} > - Temperature &gt; 50°C</Text>
                 </View>
                 <Hoz/>
            </View>
        )
    }
}



function Hoz(){
    return (
    <View style={{width:"100%",height:1,backgroundColor:"#c9c9c9", marginVertical:4,}} ></View>
    )
}


type ButtonMi_props = {
    caption:string,
    wrapperStyle?: StyleProp<ViewStyle>
    innerTextStyle?: StyleProp<TextStyle>
}
export  class ButtonMi extends Component<ButtonMi_props>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <TouchableHighlight  style={[{alignSelf:"center"},this.props.wrapperStyle]} underlayColor={Palette.primary_2_opac40}  onPress={()=>{}} >
                    <Text  style={this.props.innerTextStyle} > {this.props.caption}</Text>
                </TouchableHighlight>
        )
    }
}






/**
 * simple stylable icon button with TouchableHighlight
 */
type IconButtonMi_props = {
    wrapperStyle?: StyleProp<ViewStyle>
    innerSvgMiSize?: number
    innerSvgMiData: string
    color:string
    underlayColor?: string
    hitSlop : Insets
    onClick: ()=>void
}
export  class IconButtonMi extends Component<IconButtonMi_props>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
         
                <TouchableHighlight hitSlop={this.props.hitSlop} style={[{alignSelf:"center",alignItems:"center",justifyContent:"center"},this.props.wrapperStyle]} underlayColor={this.props.underlayColor || "transparent"} 
                 onPress={this.props.onClick} >
                    <SvgMi color={this.props.color} size={this.props.innerSvgMiSize||24} xmldata={this.props.innerSvgMiData} />
                </TouchableHighlight>
          
        )
    }
}








type ManualControlSection_props = {

}
type ManualControlSection_state = {

}
export  class ManualControlSection extends Component<ManualControlSection_props, ManualControlSection_state>{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (

            <View >
            </View>
        )
    }
}




