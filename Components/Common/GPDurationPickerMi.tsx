import React, { Component, createRef, RefObject } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Dimensions, ViewStyle, StyleProp, TextStyle, Button, TouchableHighlight, KeyboardTypeOptions } from 'react-native';
import { ConditionType, Conditon, Device } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { Picker } from '@react-native-picker/picker';
import { ButtonMi } from '../Home/DeviceScreen';


export type DurationTypeMi = {
    value:number,
    unit:"s"|"m"|"h"|"d"|"w"
}

export function DurationTypeMiToSeconds(d:DurationTypeMi):number{
    switch (d.unit) {
        case "s": return d.value*1;
        case "m": return d.value*60;
        case "h": return d.value*3600;
        case "d": return d.value*3600*24;
        case "w": return d.value*3600*24*7;
        default:
            break;
    }

}
export function DurationTypeMiFromSeconds(d:number):DurationTypeMi{
    if(d%(3600*24*7)==0) return {unit:"w",value:d/(3600*24*7)};
    if(d%(3600*24)==0) return {unit:"d",value:d/(3600*24)};
    if(d%(3600)==0) return {unit:"h",value:d/(3600)};
    if(d%(60)==0) return {unit:"m",value:d/(60)};
    if(d%(1)==0) return {unit:"s",value:d/(1)};
    
}

export function DurationTypeMiToString(durationAsDTypeMi:DurationTypeMi):string{
    return (durationAsDTypeMi.value)+" "+ (durationAsDTypeMi.unit=="s"?"Second":durationAsDTypeMi.unit=="m"?"Minute":durationAsDTypeMi.unit=="h"?"Hour":durationAsDTypeMi.unit=="d"?"Day":durationAsDTypeMi.unit=="w"?"Week":"error")+(durationAsDTypeMi.value==1?"":"s")
    
}

const dialogButton_wrapper_style : StyleProp<ViewStyle>={
    marginHorizontal:6,
    paddingHorizontal:6,
    paddingVertical:4
} 
const dialogButton_inner_style : StyleProp<TextStyle>={
    color:Palette.primary_2,
    fontSize:16,
    fontWeight:"700",
    
}
 const dialog_prompt_text_style : StyleProp<TextStyle>={
    color:Palette.inkDarkGrey,
    fontSize:16,
    fontWeight:"200"
} 

type GPDurationPickerMi_props = {
    onCancel?:()=>void
    onDone?:(num:number,picked:string)=>void
    initialValue:number
    initialSelectedOption:string
}
type GPDurationPickerMi_state = {
    currentText:string
    currentPickedOption:string
}
/**
 * intended to be wraped in a modal, use only one instance for multiple purposes withing the screen 
 * it will require some state and invoking fnctions use the example from AutoOptionsSection
 * incapsulates a basic duration picker UI awith done cancel buttons
 */
export class GPDurationPickerMi extends Component<GPDurationPickerMi_props, GPDurationPickerMi_state>{
    constructor(props:Readonly<GPDurationPickerMi_props>) {
        super(props)
        this.state = {
            currentPickedOption:props.initialSelectedOption,
            currentText: props.initialValue.toString()
        }
        this.text_ref=createRef();
        this.handleDoneClick=this.handleDoneClick.bind(this)
    }
    text_ref : RefObject<TextInput>
    
    handleDoneClick(){
        let inp = Number.parseInt(this.state.currentText)
        
        if(Number.isNaN(inp)) return
        if(inp<1) return

        this.props.onDone(inp,this.state.currentPickedOption)
    }
    handleCancelClick(){
        this.props.onCancel()
        
    }
    render() {
        return (
            <View style={{flexDirection:"column", padding:10, minHeight:200, minWidth:Dimensions.get("window").width*0.8, backgroundColor:"#ffffffff", alignSelf:"center", }}>
                <Text style={dialog_prompt_text_style} >Duration:</Text>
                <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-around"}} >
                    <TextInput ref={this.text_ref} onChange={(e)=>{this.setState({currentText:e.nativeEvent.text})}} underlineColorAndroid={Palette.primary_2} keyboardType='numeric' style={{marginRight:4}} value={this.state.currentText}  ></TextInput>
                    <Picker onValueChange={(it)=>{this.setState({currentPickedOption:it})}} selectedValue={this.state.currentPickedOption} style={{ width:150 }} mode='dropdown'>
                        <Picker.Item label='Seconds' value={"s"} />
                        <Picker.Item label='Minutes' value={"m"} />
                        <Picker.Item label='Hours' value={"h"} />
                        <Picker.Item label='Day' value={"d"} />
                        <Picker.Item label='Week' value={"w"} />
                    </Picker>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}} >
                    <ButtonMi underlayColor='#eeeeee' onClick={this.handleCancelClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style}  caption="Cancel"  />
                    <ButtonMi underlayColor='#eeeeee' onClick={this.handleDoneClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style} caption='Done'/>          
                </View>
            </View>
        )
    }
}









const LoopPickerMi_wraper_style : StyleProp<ViewStyle> = {
    borderRadius: 100,
    backgroundColor:Palette.lightsOutBlack,
    elevation:1,
    height:24,
    alignItems:'center',
    justifyContent:"center",
    paddingHorizontal:10,

}

const LoopPickerMi_text_style : StyleProp<TextStyle> = {
 
    fontSize:16,
    color:"white",
    includeFontPadding:false,
    


}
type LoopPickerMiOption = {
    caption:string, value:string
}
type LoopPickerMi_props = {

    onChanged:(value:string)=>void
    options:LoopPickerMiOption []
    initialSelectionIx:number
    /**override default wraper stl */
    style?:StyleProp<ViewStyle>
    /**override inner text fo,t */
    fontFamily?:string
}
type LoopPickerMi_state = {
    currentSelectedIx:number
}
/**
 * 
 */
export class LoopPickerMi extends Component<LoopPickerMi_props, LoopPickerMi_state>{
    constructor(props:Readonly<LoopPickerMi_props>) {
        super(props)
        this.state = {
            currentSelectedIx:props.initialSelectionIx
        }
    }
    loop(){
        this.setState(old=>({currentSelectedIx:(old.currentSelectedIx+1) % this.props.options.length}),()=>{
            this.props.onChanged(this.props.options[this.state.currentSelectedIx].value)
        })
    
        
    }
    render() {
        const caption = this.props.options[this.state.currentSelectedIx].caption
        return (
            <TouchableHighlight style={[LoopPickerMi_wraper_style,this.props.style]}
             underlayColor={Palette.inkDarkGrey} 
             onPress={(()=>{this.loop()}).bind(this)}>
                <Text style={[LoopPickerMi_text_style,
                    {fontFamily:this.props.fontFamily}]}>{caption}

                </Text>

            </TouchableHighlight>
        )
    }
}














type ConditionCreateDlg_props = {
    onCancel?:()=>void
    onDone?:(newCondition:Conditon)=>void
    initialValue:Conditon
}
type ConditionCreateDlg_state = {
    currentParam1:string
    currentType:ConditionType
    currentTargetVar : "temp"|"hum"
}


//todo refactor

/**
 * UI for creating (petentially editing) condition objects
 */
 export class ConditionCreateDlg extends Component<ConditionCreateDlg_props, ConditionCreateDlg_state>{
    constructor(props:Readonly<ConditionCreateDlg_props>) {
        super(props)
        this.state = {
            currentParam1:"50",
            currentTargetVar:"temp",
            currentType:"gt",

        }
        this.text_ref=createRef();
        this.handleDoneClick=this.handleDoneClick.bind(this)
    }
    text_ref : RefObject<TextInput>
    
    handleDoneClick(){
        let inp = Number.parseInt(this.state.currentParam1)
        
        if(Number.isNaN(inp)) return
        if(inp<1) return

        this.props.onDone({param1:inp,type:this.state.currentType as ConditionType, targetVar: this.state.currentTargetVar as 'hum'|'temp',param2:null})
    }
    handleCancelClick(){
        this.props.onCancel()
        
    }
    render() {
        return (
            <View style={{flexDirection:"column",  padding:10, minHeight:200, minWidth:Dimensions.get("window").width*0.8, backgroundColor:"#ffffffff", alignSelf:"center", }}>
                <Text style={dialog_prompt_text_style} >Condition:</Text>
                <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-around"}} >
                    
                    <LoopPickerMi initialSelectionIx={0}
                    onChanged={(val)=>{this.setState({currentTargetVar:val as "hum"|"temp"})}}
                      options={[
                        {caption:"Tempurature",value:"temp"},
                          {caption:"Humidity",value:"hum"},]} />
                    <LoopPickerMi initialSelectionIx={0}
            onChanged={(val)=>{this.setState({currentType:val as "gt"|"lt"})}}
 
                    fontFamily="Comfortaa-Regular" 
                    style={{height:32,width:32,padding:0}}
                    options={[{caption:">",value:"gt"},
                    {caption:"<",value:"lt"}]}
                     />
                  
                    <TextInput ref={this.text_ref} onChange={(e)=>{this.setState({currentParam1:e.nativeEvent.text})}} underlineColorAndroid={Palette.primary_2} keyboardType='numeric' style={{marginRight:4}} value={this.state.currentParam1}  ></TextInput>

                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}} >
                    <ButtonMi underlayColor='#eeeeee' onClick={this.handleCancelClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style}  caption="Cancel"  />
                    <ButtonMi underlayColor='#eeeeee' onClick={this.handleDoneClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style} caption='Done'/>          
                </View>
            </View>
        )
    }
}

























//todo refactor

type GPTextFieldDlg_props = {
    Title:string
    Description?:string
    /**validator returning a string means the inip is invalide, the string then specifies a user-friendely err message */
    Validator?:(inp:string)=>string|null
    /**defaul (false) behaviour is not to show message , only block Done button */
    ShowValidationErrorMessage?:boolean
    onCancel?:()=>void
    onDone?:(text:string)=>void
    initialValue?:string
    keyboardType?:KeyboardTypeOptions
}
type GPTextFieldDlg_state = {
    currentText:string
}
/**
 * used with modal, shows a single text field, optional description and validation cb
 */
export class GPTextFieldDlg extends Component<GPTextFieldDlg_props, GPTextFieldDlg_state>{
    constructor(props:Readonly<GPTextFieldDlg_props>) {
        super(props)
        this.state = {
            currentText:props.initialValue?props.initialValue:""
        }
    }
    text_ref : RefObject<TextInput>

    isEmptyStr(){
        return (this.state.currentText=="")||(!this.state.currentText)
    }


    
    handleDoneClick(){
        let inp = this.state.currentText;
        if(this.props.Validator&&this.props.Validator(inp)!=null){
            return;//todo red message logic
        }
        else{//valid input or no validation required
            this.props.onDone(this.state.currentText)
        }
    }
    handleCancelClick(){
        this.props.onCancel()
        
    }
    render() {
        return (
            <View style={{flexDirection:"column",  padding:10, minHeight:200, minWidth:Dimensions.get("window").width*0.8, backgroundColor:"#ffffffff", alignSelf:"center", }}>
                <Text style={dialog_prompt_text_style} >{this.props.Title}</Text>
                <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-around"}} >

                    <TextInput autoFocus ref={this.text_ref} onChange={(e)=>{this.setState({currentText:e.nativeEvent.text})}} underlineColorAndroid={Palette.primary_2} keyboardType={this.props.keyboardType} style={{marginRight:4,flex:1}} value={this.state.currentText}  ></TextInput>

                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}} >
                    <ButtonMi underlayColor='#eeeeee' onClick={this.handleCancelClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style}  caption="Cancel"  />
                    <ButtonMi underlayColor='#eeeeee' onClick={this.handleDoneClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style} caption='Done'/>          
                </View>
            </View>
        )
    }
}










