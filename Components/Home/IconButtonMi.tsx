import React, { Component } from 'react';
import { Insets, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import SvgMi from '../Common/SvgMi';

/**
 * simple stylable icon button with TouchableHighlight
 */
 export type IconButtonMi_props = {
    wrapperStyle?: StyleProp<ViewStyle>
    innerSvgMiSize?: number
    innerSvgMiData: string
    color:string
    underlayColor?: string
    hitSlop : Insets
    onClick: ()=>void
}
export class IconButtonMi extends Component<IconButtonMi_props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <TouchableHighlight hitSlop={this.props.hitSlop} style={[{ alignSelf: "center", alignItems: "center", justifyContent: "center" }, this.props.wrapperStyle]} underlayColor={this.props.underlayColor || "transparent"}
                onPress={this.props.onClick}>
                <SvgMi color={this.props.color} size={this.props.innerSvgMiSize || 24} xmldata={this.props.innerSvgMiData} />
            </TouchableHighlight>

        );
    }
}
