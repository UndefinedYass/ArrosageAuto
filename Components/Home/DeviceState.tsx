import React, { Component } from 'react';
import { Text, View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';



//TODO move to palette
export const on_color = "#228800"
export const off_color = "#bb0033"

export const DeviceState_style : StyleProp<ViewStyle> = {
    borderColor:on_color,
    borderRadius:3,
    //borderWidth:1,
    
    paddingHorizontal:4,
    alignSelf:"flex-start",
    height:28,
    marginVertical:3,
    alignItems:'center',
    flexDirection:"row",
    backgroundColor:"transparent", //alt:whitePanel
    elevation:0 ,//alt:1

}

export const DeviceState_text_style : StyleProp<TextStyle> = {
    color:on_color,
    textAlign:"center", textAlignVertical:"center",
    paddingHorizontal:2,
    includeFontPadding:false,
    fontWeight:"bold"
}


export class DeviceState extends Component<{ state: boolean; overrideStyle?: StyleProp<ViewStyle>; }> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={[DeviceState_style, this.props.overrideStyle]}>
                <SvgMi xmldata={st.lightbulb_outline} size={16} color={this.props.state ? on_color : off_color} />
                <Text style={[DeviceState_text_style, { color: this.props.state ? on_color : off_color }]}>{(this.props.state ? "ON" : "OFF")}
                </Text>

            </View>

        );
    }
}
