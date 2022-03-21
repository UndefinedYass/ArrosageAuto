


import { pipelineTopicExpression } from '@babel/types';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React, { Component, createRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, TouchableHighlight, DatePickerAndroid, Insets, ScrollView, Pressable, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ClientUtils, { AutoOptions, Conditon, ConfigMode, DeviceConfig } from '../../Services/ClientUtils';
import { ConditionCreateDlg, DurationTypeMi, DurationTypeMiFromSeconds, DurationTypeMiToSeconds, DurationTypeMiToString, GPDurationPickerMi } from '../Common/GPDurationPickerMi';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { ConditionsEditor } from './ConditionsEditor';
import DeviceCard from './DeviceCard';
import { DeviceState } from './DeviceState';
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
    /**not used anymore the component will fetch data on mount*/
    currentConfig?:DeviceConfig,
    deviceID: string,
    deviceState: boolean,
    deviceLabel:string,
    onBack:()=>void
}
type DeviceScreen_state = {
    currentConfig:DeviceConfig
    deviceState: boolean,

}
export default class DeviceScreen extends Component<DeviceScreen_props, DeviceScreen_state>{
    constructor(props:Readonly<DeviceScreen_props>) {
        super(props)
        this.state = {
            currentConfig:null,
            deviceState:props.deviceState
            
        }
        this.handleModeSelectionChange=this.handleModeSelectionChange.bind(this)
    }
    componentDidMount(): void {
        ClientUtils.GetDeviceConfig(this.props.deviceID,true)
        .then(confg=>{
            this.setState({currentConfig:confg})
        })

        ClientUtils.GetDeviceState(this.props.deviceID)
        .then(stt=>{
            this.setState({deviceState:stt})
        })
    }
    handleModeSelectionChange(newMode:string){
        this.setState((old)=>({currentConfig:{...old.currentConfig, mode:newMode as ConfigMode}}),()=>{
            ClientUtils.SetDeviceConfig(this.props.deviceID,this.state.currentConfig).then((confg)=>{
            

            })

        })
    }
    handleOptionsClick(){

    }
   
    render() {
        
        /**while fetching data can be navailable, use loader UI */
        const availableConfig = this.state.currentConfig!=null
        const auto =availableConfig&& this.state.currentConfig.mode=="automated";
        const manual =availableConfig&&  this.state.currentConfig.mode=="manual";
        const none =availableConfig&&  this.state.currentConfig.mode=="none"
        const deviceState = this.state.deviceState
 
        return (

            <View style={deviceScreen_style} >
                { <DeviceHeader onOptionsClick={this.handleOptionsClick} 
                onBackClick={this.props.onBack}
                title={this.props.deviceLabel} deviceState={this.props.deviceState} />
                }
                <ScrollView contentContainerStyle={{flexGrow:1}} style={{flex:1,}}>
                <DeviceInfoSection deviceLabel={this.props.deviceLabel} 
                devicePin={this.props.deviceID}
                deviceState={this.state.deviceState}
                onLableUpdate={()=>{}}
                />
                  <Text style={[text_options_group_style,{marginBottom:12}]} >Mode d'operation:</Text>
                {availableConfig&&<ChipsPanel onSelectionChanged={this.handleModeSelectionChange} 
                selection={this.state.currentConfig.mode} 
                options={[{id:"manual",caption:"Manual"},{id:"automated",caption:"Automated"} , {id:"none",caption:"None"}]} />
                }{auto&&(
                    <AutoOptionsSection AutoOptionsObj={this.state.currentConfig.autoOptions} />
                )}
               
                {manual&&(
                    <View style={{alignItems:"center", justifyContent:"center", flex:1,flexDirection:"column",}}>
                        <ButtonMi
                        innerTextStyle={{
                            color:Palette.primary_2_text, fontSize:18,
                        }}
                        underlayColor={Palette.primary_2_brighter}
                        wrapperStyle={{backgroundColor:Palette.primary_2,height:58, minWidth:104,margin:10,
                            alignItems:"center", justifyContent:"center", borderRadius:10, elevation:4,
                            opacity:deviceState?0.6:1, 
                            paddingHorizontal:12}}
                             caption="START" 
                             isdisabled={deviceState}
                             onClick={()=>{
                                this.setState({deviceState:true},()=>{
                                    requestAnimationFrame(()=>{
                                        ClientUtils.SetDeviceState(this.props.deviceID,true)
                                    .then((res)=>{this.setState({deviceState:res})})

                                    })
                                    
                                    
                                })
                            }} 
                             />
                             <ButtonMi
                        innerTextStyle={{
                            color:Palette.primary_2_text, fontSize:18,
                        }}
                        underlayColor={Palette.lavaRed_brighter}
                        wrapperStyle={{backgroundColor:Palette.lavaRed,height:58, minWidth:104,margin:10,
                            alignItems:"center", justifyContent:"center", borderRadius:10,elevation:4,
                            opacity:deviceState?1:0.6,  
                            paddingHorizontal:12}}
                             caption="STOP" 
                             isdisabled={!deviceState}
                             onClick={()=>{
                                this.setState({deviceState:false},()=>{
                                    requestAnimationFrame(()=>{
                                        ClientUtils.SetDeviceState(this.props.deviceID,false)
                                        .then((res)=>{this.setState({deviceState:res})})

                                    })
                                   
                                    
                                })
                            }} 
                             />
                    </View>
                )}
                 {none&&(
                    <View style={{alignSelf:"center",flex:1,alignItems:"center",justifyContent:"center"}}><Text style={{color:"#666666",top:"25%",position:"absolute"}} >Device is disabled</Text></View>
                )}

                </ScrollView>
                {auto&&(
                    <ButtonMi onClick={()=>{}}
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
    AutoOptionsObj: AutoOptions

}
type AutoOptionsSection_state = {
    currentStartsAtDate : Date,
    currDuration : number,
    currRepeatEvery : number,
    currConditions: Conditon [],
    dp_open:boolean
    dp_initial_dur: DurationTypeMi
    db_done_result: (dur: DurationTypeMi|null)=>void
    conditionForm_open : boolean


}
export  class AutoOptionsSection extends Component<AutoOptionsSection_props, AutoOptionsSection_state>{
    constructor(props:Readonly<AutoOptionsSection_props>) {
        super(props)
        this.state = {
            currConditions:props.AutoOptionsObj.conditions,
            currDuration: this.props.AutoOptionsObj.duration,
            currRepeatEvery : props.AutoOptionsObj.reapeatEvery,
            currentStartsAtDate : props.AutoOptionsObj.startsAt,
            dp_open:false,
            dp_initial_dur: {unit:"d",value:1},
            conditionForm_open : false,
            db_done_result:()=>{},
        }
        this.openDurationPickerMi=this.openDurationPickerMi.bind(this)
    }

    openDurationPickerMi(initialDuration:DurationTypeMi,cb:(result: DurationTypeMi|null)=>void){
        this.setState({dp_initial_dur:initialDuration, dp_open:true,db_done_result:(res)=>{cb(res);this.setState({dp_open:false})}})
    }
    render() {
        const durationAsDTypeMi = DurationTypeMiFromSeconds(this.state.currDuration);
        const repeatEveryAsDTypeMi = DurationTypeMiFromSeconds(this.state.currRepeatEvery);
        return (

            <View style={{marginTop:10, flexGrow:1}} >
                <Modal onRequestClose={(()=>{this.setState({dp_open:false})}).bind(this)} transparent style={{height:"100%"}}  visible={this.state.dp_open}>
                    <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#00000080',height:"100%", alignContent:"center",justifyContent:"center", flexDirection:"column",alignItems:"center"}}  onPressOut={(()=>{this.setState({dp_open:false})}).bind(this)} >
                        <TouchableOpacity activeOpacity={1} style={{}}  onPressIn={()=>{}} >
                        <GPDurationPickerMi onDone={(num,nit)=>{
                            this.state.db_done_result({unit:nit,value:num} as DurationTypeMi)
                        }} onCancel={()=>{//todo messy part. this modale closure should be carried out at the invoker function 
                            this.setState({dp_open:false})
                        }} initialSelectedOption={this.state.dp_initial_dur.unit} 
                        initialValue={this.state.dp_initial_dur.value} />
                        </TouchableOpacity>

                    </TouchableOpacity>
                    
                </Modal>
                <Modal onRequestClose={(()=>{this.setState({conditionForm_open:false})}).bind(this)} transparent 
                style={{height:"100%"}}  visible={this.state.conditionForm_open}>
                    <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#00000080',height:"100%",
                     alignContent:"center",justifyContent:"center", flexDirection:"column",alignItems:"center"}} 
                      onPressOut={(()=>{this.setState({conditionForm_open:false})}).bind(this)} >
                        <TouchableOpacity activeOpacity={1} style={{}}  onPressIn={()=>{}} >
                        <ConditionCreateDlg onDone={(newCondition)=>{
                            this.setState(old=>({currConditions:old.currConditions.concat([newCondition]),conditionForm_open:false}))
                        }} onCancel={()=>{
                            this.setState({conditionForm_open:false})
                        }} 
                        initialValue={{param1:50,param2:null,type:"gt",targetVar:"temp"}} />
                        </TouchableOpacity>

                    </TouchableOpacity>
                    
                </Modal>
                <Text style={text_options_group_style} >Automation options:</Text>
                 <Pressable android_ripple={{radius:200,color:"#aaaaaa"}}
                  onPress={()=>{ DateTimePickerAndroid.open({mode: "date",
                  
                   style:{backgroundColor:Palette.primary_2}, 
                   value:new Date(Date.now()),
                   onChange:((e,date)=>{
                       date&& this.setState({currentStartsAtDate:date}) ;
                       (()=>{ DateTimePickerAndroid.open({mode:"time",
                  
                   style:{backgroundColor:Palette.primary_2}, 
                   value:new Date(Date.now()),
                   onChange:((e,time)=>{
                       time&& this.setState({currentStartsAtDate:date})
                   })
                });return true;})();
                   })
                })}} 

                 >
                    
                     <Text style={text_option_key_style} >Starts at</Text>
                     <Text style={text_option_value_style} >{this.state.currentStartsAtDate.toString()}</Text>
                 </Pressable>
                 <Hoz/>
                 <Pressable android_ripple={{radius:200,color:"#aaaaaa"}}
                  onPress={()=>{ 
                      this.openDurationPickerMi( durationAsDTypeMi, (res)=>{
                          if(res===null) return;
                          this.setState({currDuration:DurationTypeMiToSeconds(res)})
                      })

                  }} 

                 >
                     

                     <Text style={text_option_key_style}  >Duration</Text>
                     <Text style={text_option_value_style}>{DurationTypeMiToString(durationAsDTypeMi)}</Text>
                </Pressable>
                 <Hoz/>
                 <Pressable android_ripple={{radius:200,color:"#aaaaaa"}}
                  onPress={()=>{ 
                      this.openDurationPickerMi(repeatEveryAsDTypeMi,(res)=>{
                          if(res===null) return;
                          this.setState({currRepeatEvery:DurationTypeMiToSeconds(res)})
                      })

                  }} 

                 >
                     <Text style={text_option_key_style} >Repeat every</Text>
                     <Text style={text_option_value_style} >{DurationTypeMiToString(repeatEveryAsDTypeMi)}</Text>
                </Pressable>
                 <Hoz/>
                 <View>
                     <Text style={text_option_key_style} >Conditions</Text>
                     <ConditionsEditor onRemove={(c)=>{
                         this.setState(old=>({
                             currConditions:old.currConditions.filter(it=>(!((it.targetVar==c.targetVar)&&(it.type==c.type))))
                             
                             }))}} onAddClick={(()=>{this.setState({conditionForm_open:true})}).bind(this)} Conditions={this.state.currConditions} />
                 </View>
                 <Hoz/>
            </View>
        )
    }
}



function Hoz(){
    return (
    <View style={{width:"100%",height:1,backgroundColor:"#c9c9c9", marginVertical:0,}} ></View>
    )
}


type ButtonMi_props = {
    isdisabled?:boolean
    caption:string,
    wrapperStyle?: StyleProp<ViewStyle>
    innerTextStyle?: StyleProp<TextStyle>
    underlayColor?: string
    hitSlop? : Insets
    onClick: ()=>void
}
export  class ButtonMi extends Component<ButtonMi_props>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <TouchableHighlight  hitSlop={this.props.hitSlop} disabled={this.props.isdisabled}  style={[{alignSelf:"center"},this.props.wrapperStyle]} 
                underlayColor={this.props.underlayColor || Palette.primary_2_opac40}  
                onPress={this.props.onClick} >
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




