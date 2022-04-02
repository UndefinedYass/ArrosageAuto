

import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, Pressable, Easing } from 'react-native';
import { DeviceConfig } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DeviceDefinitionCard_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    
    backgroundColor:Palette.whitePaper,
   // backgroundColor:"#4b815d0a",
    minHeight:80,
    marginTop:0,
    alignItems:"center",
    justifyContent:"center",
   

    borderRadius:10,
    paddingHorizontal:10, paddingVertical:4, 
}
const DeviceDefinitionCard_wraper_inner_style : StyleProp<ViewStyle> = {
    alignSelf:"stretch",
    flexDirection:'row',
    justifyContent:"space-between",
}

//todo palette
const gpio_information_color  = "hsl(195, 83%, 38%)"

type DeviceDefinitionCard_props = {
    label:string
    //config:DeviceConfig
    ID: string,
    onClick:()=>void
    isSelected : boolean//for user actions such as deletion
    onLongPress:()=>void


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

        this.d = new Animated.Value(0);
       this.s= Animated.timing(this.d,{toValue:1,duration:200,
        useNativeDriver:true})
       this.us= Animated.timing(this.d,{toValue:0,duration:100,
        useNativeDriver:true})
        

    }

    d: Animated.AnimatedValue
    s: Animated.CompositeAnimation
    us: Animated.CompositeAnimation
    

    componentDidUpdate(prevProps: Readonly<DeviceDefinitionCard_props>, prevState: Readonly<DeviceDefinitionCard_state>, snapshot?: any): void {
        if(prevProps.isSelected==false&&this.props.isSelected==true){
            this.s.start();

            
        }
        else if(prevProps.isSelected==true&&this.props.isSelected==false){
            
            this.us.start();
           // this.d.setValue({x:0,y:0});
            
        }
        else if(this.props.isSelected){
            this.d.setValue(1);
        }
        else if(this.props.isSelected==false){
            this.d.setValue(0);
        }
        

    }
   
    render() {
        //const auto = this.props.config.mode=="automated"
        //const manual = this.props.config.mode =="manual"
        const isSlected = this.props.isSelected;
        return (

            <TouchableHighlight  delayLongPress={100} underlayColor={"#00000009"}  onLongPress={this.props.onLongPress}  onPress={this.props.onClick}
             style={[DeviceDefinitionCard_wraper_style,isSlected&&{backgroundColor:"#00000009"}]} >
                 <Animated.View style={[DeviceDefinitionCard_wraper_inner_style,{}]}>

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
                <Animated.View style={{alignSelf:"center",transform:[{scale:this.d}]}} >
                {true&&<SvgMi color={Palette.primary}  size={24} 
                    xmldata={st.checkBox} />}

                </Animated.View>

                 </Animated.View>
                
               




            </TouchableHighlight>
        )
    }


}





















