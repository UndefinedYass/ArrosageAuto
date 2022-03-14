


import React, { Component, createRef } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const DHTPanel_wraper_style : StyleProp<ViewStyle> = {
    flex:1,
    alignSelf:"stretch",
    flexDirection:'row',
    alignItems:"center",
    backgroundColor:Palette.panel,
    justifyContent:"space-evenly",
    borderRadius: 10,
    margin:10,
    elevation:8
    

    
}

type DHTPanel_props = {


}
type DHTPanel_state = {


}

export default class DHTPanel extends Component<DHTPanel_props, DHTPanel_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        return (

            <View style={DHTPanel_wraper_style} >
                 <SvgMi color={"#6c9aa5"} size={48} xmldata={st.cloudCircle} />
                <DHTPanelKeyValue keyStr='Humidity' value='33%'/>
                <View style={{height:"80%", width:1, backgroundColor:"#66666644"}} />
                <DHTPanelKeyValue keyStr='Tempurature' value='25°C'/>
               
                
            </View>
        )
    }


}








type DHTPanelKeyValue_props = {
    keyStr:string
    value: string
}
type DHTPanelKeyValue_state = {

}

class DHTPanelKeyValue extends Component<DHTPanelKeyValue_props, DHTPanelKeyValue_state>{
    constructor(props) {
        super(props)
        this.state = {

        }

    }



    render() {
        return (

            <View style={{flexDirection:"column", alignItems:"center"}} >
               
                <Text style={{color:"#666666"}} > {this.props.keyStr} </Text>
                <Text style={{fontSize:18, fontWeight:"bold"}} > {this.props.value} </Text>
                
                




            </View>
        )
    }


}


