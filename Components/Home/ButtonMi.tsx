import React, { Component } from 'react';
import { Insets, StyleProp, Text, TextStyle, TouchableHighlight, ViewStyle } from 'react-native';
import { Palette } from '../Common/theme';


export type ButtonMi_props = {
    isdisabled?:boolean
    caption:string,
    wrapperStyle?: StyleProp<ViewStyle>
    innerTextStyle?: StyleProp<TextStyle>
    underlayColor?: string
    hitSlop? : Insets
    onClick: ()=>void
}
export class ButtonMi extends Component<ButtonMi_props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableHighlight hitSlop={this.props.hitSlop} disabled={this.props.isdisabled} style={[{ alignSelf: "center" }, this.props.wrapperStyle]}
                underlayColor={this.props.underlayColor || Palette.primary_2_opac40}
                onPress={this.props.onClick}>
                <Text style={this.props.innerTextStyle}> {this.props.caption}</Text>
            </TouchableHighlight>
        );
    }
}
