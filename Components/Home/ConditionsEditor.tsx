import React, { Component, createRef, RefObject } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Dimensions, ViewStyle, StyleProp, TextStyle, Button } from 'react-native';
import { ConditionType, Device, Conditon } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { Picker } from '@react-native-picker/picker';
import { ButtonMi, IconButtonMi } from '../Home/DeviceScreen';





type ConditionsEditor_props = {
    Conditions: Conditon[]
    onAddClick: ()=>void
    onRemove: (condition: Conditon)=>void
}
type ConditionsEditor_state = {
}
/**
 * not editor but a conditions listing place
 */
export class ConditionsEditor extends Component<ConditionsEditor_props, ConditionsEditor_state>{
    constructor(props:Readonly<ConditionsEditor_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection:"row", marginBottom:6,  flexWrap:"wrap"}} >
               
            
                    {this.props.Conditions.map((it,ix)=>(
                    <ConditionCard key={ix} condition={it}  onRemoveClick={(()=>{this.props.onRemove(it)}).bind(this)} />))}
                    <IconButtonMi innerSvgMiSize={20}  wrapperStyle={{marginLeft:6, 
                    borderRadius:100,height:28,width:28, elevation:1, backgroundColor:Palette.lightHouse}}
                     underlayColor={"#bbbbbb"} onClick={this.props.onAddClick} hitSlop={{top:2,bottom:2,right:16,left:16}} 
                     innerSvgMiData={st.add} color={Palette.lightsOutBlack}   />


                </View>
            </View>
        )
    }
}




const Condition_text_style : StyleProp<TextStyle> = {
    color:Palette.lightsOutBlack,
    textTransform:"capitalize",
    fontWeight:"700",
    fontSize:13,
    marginHorizontal:2
}



type ConditionCard_props = {
    condition:Conditon
    onRemoveClick: ()=>void
}
type ConditionCard_state = {
}
/**
 * 
 */
export class ConditionCard extends Component<ConditionCard_props, ConditionCard_state>{
    constructor(props:Readonly<ConditionCard_props>) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flexDirection:"row",elevation:1, borderRadius:100, height:28, alignItems:"center", 
            justifyContent:"center", marginVertical:2, marginHorizontal:2, backgroundColor:Palette.lightHouse,
            paddingHorizontal:6, paddingLeft:6, paddingVertical:4,alignSelf:"flex-start"}}>
                <View>
                    <Text style={Condition_text_style} >{this.props.condition.targetVar=="temp"?"temperature":"humidity"}</Text>
                </View>
                <View>
                    <Text style={Condition_text_style}  >{this.props.condition.type=="gt"?">":this.props.condition.type=="lt"?"<":this.props.condition.type=="range"?">":"err"}</Text>
                </View>
                <View>
                    <Text style={Condition_text_style}  >{this.props.condition.param1}{this.props.condition.targetVar=="temp"?"°C":"%"}</Text>
                </View>
                <IconButtonMi innerSvgMiSize={8} wrapperStyle={{marginLeft:6, borderRadius:100,height:16,width:16,
                     backgroundColor:Palette.inkDarkGrey}} underlayColor={"#bbbbbb"} onClick={this.props.onRemoveClick} 
                     hitSlop={{top:2,bottom:2,right:16,left:16}} innerSvgMiData={st.x_by_yass} 
                     color={Palette.whitePanel}   />
            </View>
        )
    }
}