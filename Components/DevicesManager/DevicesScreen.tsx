

import React, { Component, createRef, RefObject } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, Modal, Switch, AsyncStorage, Alert, AlertButton, ProgressBarAndroid, ColorPropType, VirtualizedList, Picker, Dimensions, ViewStyle, StyleProp, TextStyle, Button, TouchableHighlight, Easing, PushNotification, ToastAndroid } from 'react-native';
import ClientUtils, { Device, DeviceCompact } from '../../Services/ClientUtils';
import SvgMi, { st } from '../Common/SvgMi';
import { Palette } from '../Common/theme';
import { ButtonMi } from '../Home/DeviceScreen';
import { IconButtonMi } from "../Home/IconButtonMi";
import { AppHeader, dummyDevices, section_header_style } from '../Home/HomeScreen';
import DeviceDefinitionCard from './DeviceDefinitionCard';




const dummyDevicesAtManager : Device[] = dummyDevices


const DevicesScreen_wraper_style : StyleProp<ViewStyle>={
    flex:1,
    alignSelf:"stretch",
    backgroundColor:Palette.whitePaper,

}

const floatingAction_style : StyleProp<ViewStyle> ={
    borderRadius: 100,
    height:64,
    width:64,
    backgroundColor:Palette.primary_2, //lights out
    alignItems:"center",
    justifyContent:"center",
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation:3,

}

type DevicesScreen_props = {


}
type DevicesScreen_state = {
    createDeviceDlg_open?:boolean
    devicesCollectionCompact :  DeviceCompact[]
    currentSelection :  string[] //selected card's IDs
}

export default class DevicesScreen extends Component<DevicesScreen_props, DevicesScreen_state>{
    constructor(props: Readonly<DevicesScreen_props>) {
        super(props)
        this.state = {
            createDeviceDlg_open:false,
            devicesCollectionCompact:ClientUtils.cache.DevicesHeaders||[],
            currentSelection : []
        }
        this.animated_opac= new Animated.Value(0);
        
        
       // this.s= Animated.timing(this.animated_opac,{toValue:{x:1,y:1},  speed:0.1,  useNativeDriver:true})
        this.s= Animated.timing(this.animated_opac,{toValue:1,duration:200,easing:Easing.in(Easing.ease),useNativeDriver:true})
        this.us= Animated.timing(this.animated_opac,{toValue:0,duration:200,easing:Easing.out(Easing.ease),useNativeDriver:true})

        this.handleLongPressFromCard=this.handleLongPressFromCard.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this)
    }
    animated_opac : Animated.AnimatedValue
    s : Animated.CompositeAnimation
    us : Animated.CompositeAnimation
   
     

    componentDidUpdate(prevProps: Readonly<DevicesScreen_props>, prevState: Readonly<DevicesScreen_state>, snapshot?: any): void {
        if(prevState.currentSelection.length==0&&this.state.currentSelection.length>0){
            //got selection
            this.s.start()

        }
        if(prevState.currentSelection.length>0&&this.state.currentSelection.length==0){
            //got selection
            this.us.start()

        }
    }

    refreshData(){
        ClientUtils.GetDevicesHeaders(false).then(devicesComp=>this.setState({devicesCollectionCompact:devicesComp})).catch(err=>{
            ToastAndroid.show(`Couldn't connect to ${ClientUtils.Host}\n${err?.message}`,1000)
        });
       
    }
    componentDidMount(): void {
        this.refreshData()
    }

    handleLongPressFromCard(deviceID: string){
        this.setState(old=>{
            if(old.currentSelection.includes(deviceID)){
                
            }
            else{
                return ({currentSelection:[...old.currentSelection,deviceID]})
            }
        });

    }
    handleLongClickFromCard(deviceID: string){
        this.setState(old=>{
            if(old.currentSelection.length>0){
                if(old.currentSelection.includes(deviceID)){
                    return({currentSelection:old.currentSelection.filter(d=>d!=deviceID)})
                }
                else{
                    return ({currentSelection:[...old.currentSelection,deviceID]})
                }
                
            }
            
        });

    }

    async handleDeleteClick(){
        let deletedIDS = []
        let sel_cc= this.state.currentSelection.length;
        for (let i = 0; i < sel_cc; i++) {
            const id = this.state.currentSelection[i];
            let res = await ClientUtils.DeleteDevice(id)
            if(res){
                deletedIDS=deletedIDS.concat([id])
            }
            
        }
        ToastAndroid.show(`Deleted ${deletedIDS.length} devices`,1000)
        
        //alert(`Deleted ${deletedIDS.length} devices`);
        ClientUtils.cache.Devices = ClientUtils.cache.Devices.filter(d=>deletedIDS.includes(d.ID)==false)
        ClientUtils.cache.DevicesHeaders = ClientUtils.cache.DevicesHeaders.filter(d=>deletedIDS.includes(d.ID)==false)
        this.refreshData();
    }


    render() {
        const selection = this.state.currentSelection.length>0
        return (
            <View style={DevicesScreen_wraper_style} >
                <Modal onRequestClose={(()=>{this.setState({createDeviceDlg_open:false})}).bind(this)} transparent 
                style={{height:"100%"}}  visible={this.state.createDeviceDlg_open}>
                    <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#00000080',height:"100%",
                     alignContent:"center",justifyContent:"center", flexDirection:"column",alignItems:"center"}} 
                      onPressOut={(()=>{this.setState({createDeviceDlg_open:false})}).bind(this)} >
                        <TouchableOpacity activeOpacity={1} style={{}}  onPressIn={()=>{}} >
                        <CreateDeviceDlg  
                        initialLabel='New device'
                        onCancel={()=>{
                            this.setState({createDeviceDlg_open:false})
                        }}  
                        onDone={(new_d)=>{
                            ClientUtils.CreateDevice(new_d).then(success=>{
                            if(!success) alert("something went wrong");
                            else{
                                ToastAndroid.show(`Created device '${new_d.Config.label}'`,1000)
                                
                                this.refreshData();
                                this.setState({createDeviceDlg_open:false})
                            }
                        })}}  />
                        
                        </TouchableOpacity>

                    </TouchableOpacity>
                    
                </Modal>

                <AppHeader />
                {true && <Animated.View   style={{flexDirection:"row",
                flex:1, position:"absolute",minHeight:50,
                top:0,right:0,   opacity:this.animated_opac,        
                   justifyContent:"flex-end",maxHeight:50,}}>
                    <IconButtonMi underlayColor='#00000020' color={Palette.whitePanel}
                     hitSlop={{left:20,top:10,right:10,bottom:10}} 
                    innerSvgMiData={st.delete}
                     wrapperStyle={{borderRadius:100, height:32,width:32}} onClick={this.handleDeleteClick}
                    >
                    </IconButtonMi>
                </Animated.View>}
                {true&&<Text  style={[section_header_style,{height:24}]} >Devices manager</Text>}
                <FlatList
                data={this.state.devicesCollectionCompact}
                getItemLayout={(data, index) => (
                    {length: 90, offset: 90 * index, index}
                  )}
                renderItem={(it=>(
                    <DeviceDefinitionCard isSelected={this.state.currentSelection.includes(it.item.ID)}
                     onLongPress={(()=>{this.handleLongPressFromCard(it.item.ID)}).bind(this)} ID={it.item.ID}
                     onClick={selection?(()=>{this.handleLongClickFromCard(it.item.ID)}).bind(this):undefined} label={it.item.label}
                   
                    
                    ></DeviceDefinitionCard>
                ))}
                >

                </FlatList>
                
                <TouchableHighlight underlayColor={Palette.primary_2_brighter}
                 style={floatingAction_style} onPress={()=>{this.setState({createDeviceDlg_open:true})}}  >
                    <SvgMi xmldata={st.add} size={24} />
                </TouchableHighlight>
            </View>
        )
    }


}









const dialogButton_wrapper_style : StyleProp<ViewStyle>={
    marginHorizontal:6,
    paddingHorizontal:6,
    paddingVertical:4
} 
const dialogButton_inner_style : StyleProp<TextStyle>={
    color:Palette.primary_2,
    fontSize:14,
    fontWeight:"700",
    fontVariant:["small-caps"]
    
}

type CreateDeviceDlg_props = {
    initialLabel:string
    initialPin?:number
    onCancel?:()=>void
    onDone?:(newDevice:Device)=>void
    initialValue?:string
}
type CreateDeviceDlg_state = {
    currentLabel:string
    currentPin:string
}
/**
 * 
 */
export class CreateDeviceDlg extends Component<CreateDeviceDlg_props, CreateDeviceDlg_state>{
    constructor(props:Readonly<CreateDeviceDlg_props>) {
        super(props)
        this.state = {
            currentLabel:"",
            currentPin:this.determinUnusedPin(),
        }
        this.text_ref= createRef()
    }
    text_ref : RefObject<TextInput>

    componentDidMount(): void {
        //this.text_ref.current.focus()
    }

    determinUnusedPin():string{
        let i = 1;
        while(ClientUtils.cache.DevicesHeaders.some(d=>d.ID==i.toString())){
            i++;
        }
        return i.toString();
    }

    isEmptyStr(){
        return (this.state.currentLabel=="")||(!this.state.currentLabel)
    }

    validNumSTR(s:string){
        return Number.isNaN(Number.parseInt(s))==false;
    }
    canProceed():boolean{
        let labelInp = this.state.currentLabel;
        let pinInp = this.state.currentPin;
        let validate_err= this.validate(pinInp,labelInp)
        if(validate_err!=null){
            return false
        }
        return true;

    }
    /**
     * validates data format and cheks locally whether pin is reserved
     * @returns 
     */
    validate(pin_inp,lbl_inp):null|string{
        if(this.isEmptyStr()){
            return 'invalid label'
        }
        if(this.validNumSTR(pin_inp)==false){
            return "invalid gpio pin number";
        }
        let pinNum = Number.parseInt(pin_inp);
        if(ClientUtils.cache.Devices.some(d=>d.ID==pinNum.toString())){
            return  `GPIO ${pinNum} id used for another device`
        }
        return null;
    }
    handleDoneClick(){
        let labelInp = this.state.currentLabel;
        let pinInp = this.state.currentPin;
        let validate_err= this.validate(pinInp,labelInp)
        if(validate_err!=null){
            alert(validate_err)
            return;//todo red message logic
        }
        else{//valid input or no validation required
            this.props.onDone({currentState:false,ID:Number.parseFloat(pinInp).toString(),Config:{label:labelInp,manualState:false,mode:"manual"}} as  Device)
        }
    }
    handleCancelClick(){
        this.props.onCancel()
        
    }
    render() {
        const valid= this.validate(this.state.currentPin,this.state.currentLabel)==null
        return (
            <View style={{ flexDirection: "column", padding: 10, paddingTop:14,paddingHorizontal:12, minHeight: 160, minWidth: Dimensions.get("window").width * 0.8, backgroundColor: "#ffffffff", alignSelf: "center", }}>
                <Text style={{ color: Palette.inkDarkGrey, fontSize: 17, fontWeight: "bold" }} 
                >New device</Text>
                <View style={{ marginLeft:6, flexDirection: "row", flex: 1,  alignItems: "center", justifyContent: "space-around" }} >

                    <TextInput placeholder='Label'  autoCorrect={false}  value={this.state.currentLabel} autoFocus selectTextOnFocus  ref={this.text_ref} onChange={(e) => { this.setState({ currentLabel: e.nativeEvent.text }) }} underlineColorAndroid={Palette.primary_2} style={{ marginRight: 4, fontWeight:"400", fontSize:17, flex: 1 }}  ></TextInput>

                </View>
                <View style={{  marginLeft:6,flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "flex-start" }} >

                    <TextInput placeholder='GPIO' selectTextOnFocus  onChange={(e) => { this.setState({ currentPin: e.nativeEvent.text }) }} underlineColorAndroid={Palette.primary_2} keyboardType={"numeric"} style={{ marginRight: 4, maxWidth: 40 }} value={this.state.currentPin}  ></TextInput>

                </View>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }} >
                    <ButtonMi underlayColor='#eeeeee'  onClick={this.handleCancelClick.bind(this)} wrapperStyle={dialogButton_wrapper_style} innerTextStyle={dialogButton_inner_style} caption="CANCEL" />
                    <ButtonMi underlayColor='#eeeeee' onClick={valid? this.handleDoneClick.bind(this):undefined}
                     wrapperStyle={dialogButton_wrapper_style} innerTextStyle={[dialogButton_inner_style,
                     !valid&&{color:"#888888"}]} caption='CREATE DEVICE' />
                </View>
            </View>
        )
    }
}