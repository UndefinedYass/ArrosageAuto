

//API_v1 types can be altered but keep synced with server-mock project
//todo make compatible with API changes 24-march-2022

import EventEmitter from "../Services/Common/eventemitter3"
import HomeScreen from "../Components/Home/HomeScreen"

//note API 24-march-2022 is partially implemented here
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
export type ConditionType ="gt" | "lt" 
export type AutoOptions = {
    startsAt : Date
    duration : number
    //in seconds
    repeatEvery : number
    conditions : Conditon[]
}
export type Conditon = {
    type: ConditionType
    targetVar : "temp"|"hum"
    param1: number
    //param2: number
}
export type devicesCollectionResponseType  = {devices:DeviceCompact[]}
export type dhtResponseType  = {readings:{temp:number,hum:number},error:string|null}
export type BooleanStateResponse ={resState:"on"|"off"}
export type BooleanStateRequest ={reqState:"on"|"off"}
export type DeviceCompact = {ID:string,label:string,currentState:boolean,mode:ConfigMode}
export type TimeR = {t:number,m:number} //extended to include millis, compatible with 25-03

//ws protocol types 
export type  WSServerEvent = "dht-update"|"ldr-update"
export type wsRequestParams = any
export type  RequestTopic  = "DevicePost"|"DeviceConfigPut"|"DeviceStatePut"|"TimePut"|
"DevicesListGet"|"DeviceConfigGet"|"DeviceStateGet"|"TimeGet"|"DHTStateGet"|"DeviceDelete" 
export const RequestTopic_asList = ["DevicePost","DeviceConfigPut","DeviceStatePut","TimePut",
"DevicesListGet","DeviceConfigGet","DeviceStateGet","TimeGet","DHTStateGet","DeviceDelete" ]



class WSUtils extends EventEmitter{
    /**
     *
     */
    constructor() {
        super();
        
    }

    onDevicesListUpdate(){

    }
    onDeviceStateUpdate(){

    }
    onDeviceConfigUpdate(){

    }
    onLDRUpdate(){

    }
    onDHTUpdate(){

    }

}


export default class ClientUtils  {
    
    static WS : EventEmitter = new EventEmitter();
    /**
     * address and port on wich arduino server is listening
     *(to be assigned directely from the rest of the app)
     */
    static Host : string = "192.168.43.205:6262"
    static AccessToken : string //not used in dev mode
    static socket : WebSocket; //added on 30-apr-2022 and will replace the old API

    /**a global state, stores temporary data and serve it back while fetch operations are taking place, 
     * this helps avoiding noticeable blank UI when loading e.g devviceScreen 
    */
    public static cache:{
        DevicesHeaders:DeviceCompact[], Devices:Device[],dhtLastResponse:dhtResponseType
        
    }={
        DevicesHeaders:[],
        Devices:[],
        dhtLastResponse:{readings:{temp:0,hum:0},error:null}
    }

    static action_start =0;




   
    
    static ws_onClose(ev : CloseEvent){
        ClientUtils.WS.emit("closed",null,null,null,null,null);
        //this.Connect();
    }
    static ws_onOpen(ev: Event){
        ClientUtils.WS.emit("open",null,null,null,null,null);
    }
    static ws_onMsg(ev:MessageEvent){
        console.log("corresponds?")
        let split =( ev.data as string) .split(";")
        if(split.length==2){//after spec this corresponds to a server ev
            console.log("corresponds to a server ev")
            let ev_name = split[0]
            let ev_payloead = split[1]
            console.log("ok:"+ev_payloead.toString())
            ClientUtils.WS.emit(ev_name,ev_payloead,null,null,null,null)
           
            
        } 
        else if(split.length==4){//this corresponds to a server response
            console.log("corresponds to a server response")
            let ev_name = split[0]
            let original_id= split[1]
            let completion_code= split[2]
            let ev_payloead = split[3]
            console.log("ok:"+ev_payloead.toString())
            console.log("WS:: emiting a "+ev_name)
            ClientUtils.WS.emit(ev_name,original_id,completion_code,ev_payloead,null,null)
            
            
        } 
        
    }
    static Connect():Promise<boolean>{
        return new Promise((resolve,rejsect)=>{
            this.socket = new WebSocket(`ws://${this.Host}/ws`);
            this.socket.onclose = ClientUtils.ws_onClose;
            this.socket.onmessage = ClientUtils.ws_onMsg;
            this.socket.onopen = (ev)=>{ClientUtils.ws_onOpen(ev); this.socket.onopen =ClientUtils.ws_onOpen;  resolve(true);};
            
            //ClientUtils.WS = new EventEmitter();
        })
        

    }


    //ws protocol returns undef on failure
    static stringifyWSparams(params_obj: wsRequestParams): string {
        let keys = Object.keys(params_obj)
        let res = ""
        let i = 0;
        for (i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = params_obj[key];
            if(key.includes("&")||val.includes("&")){
                console.log("param cannot contain & characters")
                return undefined;
            }
            res += `&${key}=${val}`
        }
        return res.substring(1);//removing the first & char
    }
    //ws protocol
    static formatRequest(topic:RequestTopic, msg_id:number, params:wsRequestParams,pl?:object|string):string{
        let formated_params = ClientUtils.stringifyWSparams(params);
        if(formated_params===undefined){
            return undefined;
        }
        return `${topic};${msg_id};${(pl?((typeof pl ==="string")?pl: JSON.stringify(pl)):"")};${formated_params}` // 3;'s
    }



    /**
     * ws [api]
     */
     static GetDevicesHeadersWs(use_cache:boolean):Promise<DeviceCompact[]> {
        return new Promise((resolve,reject)=>{
            this.socket.send(this.formatRequest("DevicesListGet",45,{}))
            this.WS.once("DevicesListGet-resp",(arg1,arg2,arg3)=>{
                console.log("got my list")
                console.log(arg1)
                console.log(arg3)
                resolve(JSON.parse(arg3).devices)
            })
        })
    }
    /**
     * [api]
     * returns a colection of ompact device representations, that only include ID and label , potentially state asell
     * the use of cache arg will return a local stored data unless it's not found, passing false will return frech data and update the cacheed one
     */
    static GetDevicesHeaders(use_cache:boolean):Promise<DeviceCompact[]> {
        return new Promise((resolve,reject)=>{
            if(use_cache){
                if(ClientUtils.cache.DevicesHeaders.length>1){
                    resolve(ClientUtils.cache.DevicesHeaders); return
                }
            }
            fetch(`http://${ClientUtils.Host}/devices`).then(res=>(res.json()))
            .then((devicesRes:devicesCollectionResponseType)=>{
                this.cache.DevicesHeaders=devicesRes.devices//updae cache
                resolve  (devicesRes.devices)
            })
            .catch(err=>{reject(err)})
        })
    }




    /**
     * [api]
     */
    static CreateDevice(newDevice: Device):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            fetch(`http://${ClientUtils.Host}/devices/${newDevice.ID}`,
            {method:"POST",body:JSON.stringify (newDevice),
            headers:{'Content-Type':'application/json'}})
            .then((response)=>{
                if(response.status==200) resolve(true)
                else resolve(false)//todo creatiion failure reason
            })
            .catch(err=>{alert(err);reject(err)})
        })

    }


    /**
     * [api ws]
     */
    static CreateDeviceWS(newDevice: Device): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.socket.send(this.formatRequest("DevicePost", 46, {d_id:newDevice.ID},JSON.stringify(newDevice)))
            let tmr = setTimeout(() => {
                reject("timeout err")
            }, 2000);
            this.WS.once("DevicePost-resp", (arg1, arg2, arg3) => {
                console.log("got DevicePost resp")
                console.log(arg1)
                console.log(arg3)
                clearInterval(tmr)
                resolve(arg2=="200")
            })
        })

    }


    /**
     * [api]
     */
    static DeleteDevice(deviceID: string):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            fetch(`http://${ClientUtils.Host}/devices/${deviceID}`,
            {method:"DELETE"})
            .then((response)=>{
                if(response.status==200) resolve(true)
                else resolve(false)//todo deleltion failure reason
            })
            .catch(err=>{alert(err);reject(err)})
        })
    }

    /**
     * [api ws]
     */
     static DeleteDeviceWS(deviceID: string):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            this.socket.send(this.formatRequest("DeviceDelete", 46, {d_id:deviceID}))
            let tmr = setTimeout(() => {
                reject("timeout err")
            }, 2000);
            this.WS.once("DeviceDelete-resp", (arg1, arg2, arg3) => {
                console.log("got DeviceDelete resp")
                console.log(arg1)
                console.log(arg3)
                clearInterval(tmr)
                resolve(arg2=="200")
            })
        })
    }




    /**
     * [api]
     */
    static GetDeviceState (deviceID: string): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            fetch(`http://${ClientUtils.Host}/devices/${deviceID}/state`)
            .then((r)=>r.json())
            .then((responseState:BooleanStateResponse)=>{
                //alert('device set to '+ responseState.resState  )
                resolve  (responseState.resState=="off"?false:true)
            })
            .catch(err=>{alert(err);reject(err)})
        })
    }

    /**
     * [ws api]
     * @param deviceID 
     * @returns 
     */
    static GetDeviceStateWS(deviceID: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.socket.send(this.formatRequest("DeviceStateGet", 46, {d_id:deviceID}))
            this.WS.once("DeviceStateGet-resp", (arg1, arg2, arg3) => {
                console.log("got my list")
                console.log(arg1)
                console.log(arg3)
                resolve(JSON.parse(arg3).resState == "off" ? false : true)
            })
        })
    }


    /**
     * [api] (todo update)
     */
    static SetDeviceState_ (deviceID: string, userState:boolean): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            let reqS:BooleanStateRequest = {reqState:userState?"on":"off"}
            fetch(`http://${ClientUtils.Host}/devices/${deviceID}/state`,
            {method:"POST",body:JSON.stringify (reqS),
            headers:{'Content-Type':'application/json'}})
            .then((r)=>r.json())
            .then((responseState:BooleanStateResponse)=>{
                //alert('device set to '+ responseState.resState  )
                resolve  (responseState.resState=="off"?false:true)
            })
            .catch(err=>{alert(err);reject(err)})
        })
    }


    /**
     * [api] (todo update)
     */
    static SetDeviceStateWS(deviceID: string, userState: boolean): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let reqS:BooleanStateRequest = {reqState:userState?"on":"off"}
            console.log("senfing det device state")
            ClientUtils.WS.once("DeviceStatePut-resp", (arg1, arg2, arg3) => {
                console.log("got my device state rep")
                console.log(`after ${Date.now()-ClientUtils.action_start}`)

                if(arg2!="200"){
                    console.log("got error "+arg2)
                    reject(arg2)
                    return
                }
                resolve  (JSON.parse(arg3).resState=="off"?false:true)
            })
            this.socket.send(this.formatRequest("DeviceStatePut", 47, {d_id:deviceID},reqS))
            console.log(`socket API call after ${Date.now()-ClientUtils.action_start}`)
        })
    }



    /**
     * [api]
     * @param deviceID 
     * @param use_cache 
     * @returns 
     */
    static GetDeviceConfig (deviceID: string, use_cache:boolean):Promise<DeviceConfig>{
        return new Promise((resolve,reject)=>{
            if(use_cache){
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    resolve(existent_cached_device.Config); return
                }  
            }
            fetch(`http://${ClientUtils.Host}/devices/${deviceID}/config`).then(res=>(res.json()))
            .then((deviceConfg:DeviceConfig)=>{
                deviceConfg.autoOptions.startsAt=new Date(deviceConfg.autoOptions.startsAt);
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    existent_cached_device.Config=deviceConfg
                }
                else{
                    this.cache.Devices = this.cache.Devices.concat([{ID:deviceID,Config:deviceConfg,currentState:false}])//todo fix false
                }
                resolve  (deviceConfg)
            })
            .catch(err=>{alert(err);reject(err)})

        })
    }

    /**
     * [ws api]
     * @param deviceID 
     * @returns 
     */
     static GetDeviceConfigWS (deviceID: string, use_cache:boolean):Promise<DeviceConfig>{
        return new Promise((resolve, reject) => {
            if(use_cache){
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    resolve(existent_cached_device.Config); return
                }  
            }
            this.socket.send(this.formatRequest("DeviceConfigGet", 46, {d_id:deviceID}))
            this.WS.once("DeviceConfigGet-resp", (arg1, arg2, arg3) => {
                if(arg2!="200"){
                    console.log("got error "+arg2)
                    reject(arg2)
                    return
                }
                console.log("got my dev config")
                let deviceConfg:DeviceConfig = JSON.parse(arg3);
                deviceConfg.autoOptions.startsAt=new Date(deviceConfg.autoOptions.startsAt);
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    existent_cached_device.Config=deviceConfg
                }
                else{
                    this.cache.Devices = this.cache.Devices.concat([{ID:deviceID,Config:deviceConfg,currentState:false}])//todo fix false
                }
                resolve  (deviceConfg)
            })
        })
    }



    /**
     * [api] (todo pdate)
     * the echong behaviour is mock-only don't use it
     * updates cache a swell
     */
    static SetDeviceConfig (deviceID: string, config:DeviceConfig):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            //todo date obj at autooptions should be converted to number timestamp
            //the folowing is a temporary hack, avoiding tweaking the config object itself
            let badDTstr = JSON.stringify(config.autoOptions.startsAt)
            let configStr = JSON.stringify(config);
            configStr = configStr.replace(badDTstr,config.autoOptions.startsAt.getTime().toString())

            console.log(configStr)
            console.log(badDTstr)
            fetch(`http://${ClientUtils.Host}/devices/${deviceID}/config`,
            {method:"PUT",body:configStr,
            headers:{'Content-Type':'application/json'}})
            
            .then((res)=>{
                if(res.status!=200){
                    resolve(false);
                    return;
                }
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    existent_cached_device.Config=config
                }
                else{
                    this.cache.Devices = this.cache.Devices.concat([{ID:deviceID,Config:config,currentState:false}])//todo fix false
                }
                //alert('device set to '+ responseState.resState  )
                resolve  (true)
            })
            .catch(err=>{alert(err);reject(err)})
        })
        
    }

     /**
     * [ws api]
     * @param deviceID 
     * @returns 
     */
      static SetDeviceConfigWS  (deviceID: string, config:DeviceConfig):Promise<boolean>{
        return new Promise((resolve, reject) => {
           //todo date obj at autooptions should be converted to number timestamp
            //the folowing is a temporary hack, avoiding tweaking the config object itself
            let badDTstr = JSON.stringify(config.autoOptions.startsAt)
            let configStr = JSON.stringify(config);
            configStr = configStr.replace(badDTstr,config.autoOptions.startsAt.getTime().toString())

            console.log(configStr)
            console.log(badDTstr)
            this.socket.send(this.formatRequest("DeviceConfigPut", 47, {d_id:deviceID},configStr))
            this.WS.once("DeviceConfigPut-resp", (arg1, arg2, arg3) => {
                if(arg2!="200"){
                    console.log("got error "+arg2)
                    resolve(false)
                    return
                }
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    existent_cached_device.Config=config
                }
                else{
                    this.cache.Devices = this.cache.Devices.concat([{ID:deviceID,Config:config,currentState:false}])//todo fix false
                }
                //alert('device set to '+ responseState.resState  )
                resolve  (true)
            })
        })
    }



    /**
     * [api] (not tested)
     */
    static GetTime ():Promise<Date>{
        return new Promise<Date>((resolve,reject)=>{
            fetch(`http://${ClientUtils.Host}/time`)
            .then((r)=>r.json())
            .then((res:TimeR)=>{
                //note time in second would be around 1639872000 
                //in millis 1639872000000 so we're comparing against 100000000000
                //to determin for sure the unit
                let t = res.t;
                if(typeof(res.t)=="string")
                t = Number.parseInt(res.t);
                if(t>100000000000){ resolve (new Date(res.t)); return;}
                else {
                    let seconds = t;
                    let millis = Number.parseInt((res.m?res.m:0).toString())//extra flexibility with the types 
                    resolve(new Date((seconds*1000)+millis)); return
                }
            })
            .catch(err=>{alert(err);reject(err)})
        })
    }
    /**
     * [api] (not tested)
     * resolves to true if server responded wth 200 status code and false otherwose
     * rejects on other connectivity failures
     * @param newDate 
     */
    static SetTime (newDate : Date):Promise<boolean>{
        return new Promise<boolean>((resolve,reject)=>{
            let timeR: TimeR = {t:newDate.getTime(),m:newDate.getMilliseconds()};
            fetch(`http://${ClientUtils.Host}/time`,
            {method:"PUT",body:JSON.stringify (timeR),
            headers:{'Content-Type':'application/json'}})
            .then((r)=>{
                if(r.status==200){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
            .catch(err=>{reject(err)})
        })
        
    }




    /**
     * [api]
     * @returns 
     */
    static GetSensorsInfo ():Promise<dhtResponseType>{
        return new Promise((resolve,reject)=>{
            fetch(`http://${ClientUtils.Host}/dht`).then(res=>(res.json()))
            .then((respons:dhtResponseType)=>{
                //it is important to change a sub property of the object and not the obj itself in order for changes to take effect (doing cache.dhtLast= resp.dhtLas didn't work )
                this.cache.dhtLastResponse.readings=respons.readings;
                resolve  (respons)
            })
            .catch(err=>{reject(err)})
        })
    }
}










export  class Funcs {
  
    /**
     * returns a digest for the compact repsenentation, particularily usefule in 
     * rendering lists as a key to determn whether the items needs to be re-rendered
     */
    static DeviceCompactHash(dvc_cp:DeviceCompact):string {
        return dvc_cp.ID+dvc_cp.currentState+dvc_cp.label+dvc_cp.mode //todo make this efficient for server-side too for caching and notficatoins purposes
    }


}