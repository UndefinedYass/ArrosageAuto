
export type Device = {
    ID: string
    currentState: boolean
    Config: DeviceConfig
}

export type DeviceConfig = {
    mode: ConfigMode
    label: string
    autoOptions: AutoOptions
    manualState: boolean
}
export type ConfigMode = "none" | "manual" | "automated"
export type ConditionType ="gt" | "lt" | "range"
export type AutoOptions = {
    startsAt : Date
    duration : number
    reapeatEvery : number
    conditions : Conditon[]
}
export type Conditon = {
    type: ConditionType
    param1: number
    param2: number
}

export default class ClientUtils {
    //address and port on wich arduino server is listening
    static Host : string = "192.168.43.205:6262"
    static AccessToken : string //not used in dev mode

    static GetDeviceState (deviceID: string){

    }
    static SetDeviceState (deviceID: string, userState:boolean){
        
    }
    static GetDeviceConfig (deviceID: string){
        
    }
    static SetDeviceConfig (deviceID: string, config:DviceConfig){
        
    }
    static GetTime (){
        
    }
    static SetTime (newDate : Date){
        
    }
    static GetSensorsInfo (){
        
    }
}