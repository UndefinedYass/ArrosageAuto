


import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, Pressable } from 'react-native';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';




const TabBar_wraper_style  : StyleProp<ViewStyle> = {
    //height:52,
    backgroundColor:Palette.whitePanel,
    alignSelf:"stretch",
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    display:"flex",
    paddingHorizontal: 8,
    paddingVertical: 8,

}


const text_BasicLight_style  = {
    color: "#2c2c2c",
}
  

type TabBar_props = {
    onChange : (ix :number )=>void
    selected:number
    /**distributes this over all child items 02rev  */
    itemsSelectedColor?:string
    itemsSelectedTextColor?:string



}
type TabBar_state = {
    selected:number

}

export default class TabBar extends Component<TabBar_props, TabBar_state>{
    constructor(props) {
        super(props)
        this.state={
            selected: props.selected || 0
          }
      
          this.changeSelected=this.changeSelected.bind(this)
          
        }
      
      
        changeSelected(new_ix){
          //this.props.onChange(new_ix) // so no need to set state here, cuz the parent will update this 
          this.setState({selected:new_ix})
          requestAnimationFrame(()=>{//02rev ui enhancment wraping this 
            if(this.props.onChange)
            this.props.onChange(new_ix) // so no need to set state here, cuz the parent will update this
      
          })
          
        }


    render() {
        return (

            <View style={TabBar_wraper_style} >
                  <ItemY  ix={0} changeSelected={this.changeSelected}  isDisabled={false} selected={this.state.selected} title="Dashboard" iconXmlData={st.homeRounded} icon  selectedColor={this.props.itemsSelectedColor} selectedTextColor={this.props.itemsSelectedTextColor} ></ItemY> 
         <ItemY ix={1} changeSelected={this.changeSelected} isDisabled={false}  selected={this.state.selected}  title="Devices" iconXmlData={st.deviceHub} icon selectedColor={this.props.itemsSelectedColor} selectedTextColor={this.props.itemsSelectedTextColor} ></ItemY> 
         <ItemY ix={2} changeSelected={this.changeSelected} isDisabled={false}  selected={this.state.selected} title="Settings" iconXmlData={st.settings} icon selectedColor={this.props.itemsSelectedColor} selectedTextColor={this.props.itemsSelectedTextColor} ></ItemY> 
         <ItemY ix={3} changeSelected={this.changeSelected} isDisabled={false}  selected={this.state.selected} title="info" iconXmlData={st.info} icon  selectedColor={this.props.itemsSelectedColor} selectedTextColor={this.props.itemsSelectedTextColor} ></ItemY> 
         
       


            </View>
        )
    }


}



































const YtabsStyle : StyleProp<ViewStyle> = {
  margin:0, 
  padding: 4,
  paddingHorizontal:8,
  
  alignSelf:"stretch",
  maxHeight:80,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  borderBottomColor : "#555",
  paddingVertical:1,
  //borderBottomWidth:1,

  //backgroundColor:"#222",
  
 } 


























const defaulSelectedColor = Palette.primary_2
const defaulSelectedTextColor = Palette.primary_2
const defaulUnselectedTextColor =  Palette.inkDarkGrey
const defaulUnselectedColor = Palette.inkDarkGrey


  type ItemYProps = {
    changeSelected : (ix)=>void
    isSelected?:boolean
    isDisabled:boolean //add n the 31-jan-22 update to enhance ui
    selected : number
    ix:number
    icon ?: boolean // dont use
    iconXmlData ?: string
    title ?:string,
    selectedColor?:string
    selectedTextColor?:string

  }
  type ItemYState = {
    isSelected:boolean
    isDisabled:boolean //add n the 31-jan-22 update to enhance ui
  }
  class ItemY extends Component<ItemYProps,ItemYState>{
    constructor(props:ItemYProps){
      super (props)
      let dummy_props={
        label:"Facebook",
        icon: "path/to/svg",
        isSelected : true,
        ix:"  ",
       // changeSelected() 
      }
      this.state={
        isSelected : props.ix===props.selected,
        isDisabled: props.isDisabled // todo if you noticed some werd disabled behaviour there was a typo here preventing this assigement from takingeffect 
      }
  
      this.selectMe=this.selectMe.bind(this)
      
    }

    
  
    amIselected(){
      return(this.props.selected===this.props.ix)
    }
    selectMe(){
      this.props.changeSelected(this.props.ix)
    }
    render(){
      return (
       
      <Pressable android_ripple={{borderless:true, color:"#A5D6A7",radius:48}} onPress={()=> this.props.isDisabled|| this.selectMe()} style = {{margin:0,
        
        padding: 4,
        minHeight:60,
        minWidth:45,
        borderBottomColor: this.amIselected() ? this.props.selectedColor||defaulSelectedColor :"transparent",
       // flex:1,
        alignContent:"flex-end",
    
        borderBottomWidth: 1.5,
        flexDirection:"column"
       } } >
         { this.props.icon &&
          <View style={{minHeight:32,minWidth:32,flex:1,alignContent:"center",justifyContent:"center",alignItems:"center"}}>
            {/* <Image source={this.props.icon} style={{ width:30,height:30,resizeMode:"contain",
            shadowColor:"#f00", ... (this.amIselected()? { tintColor: "orange"} : {tintColor:"#fff"} ) }}></Image> */}
         
         <SvgMi xmldata={this.props.iconXmlData} color={ this.props.isDisabled?"#444444": this.amIselected()?this.props.selectedColor||defaulSelectedColor:defaulUnselectedColor} ></SvgMi>
         
         
         </View>}
         <View>
            <Text style={{...text_BasicLight_style,color:this.props.isDisabled?"#444444":this.amIselected()?this.props.selectedTextColor||defaulSelectedTextColor:defaulUnselectedTextColor,textAlign:"center"}}>{this.props.title}</Text>
  
         </View>
       
       
       </Pressable>
      )
    }
  
  
  }
  
  