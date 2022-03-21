

//API_v1 types can be altered but keep synced with server-mock project
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
    targetVar : "temp"|"hum"
    param1: number
    param2: number
}
export type devicesCollectionResponseType  = {devices:DeviceCompact[]}
export type dhtResponseType  = {readings:{temp:number,hum:number},error:string|null}
export type BooleanStateResponse ={resState:"on"|"off"}
export type BooleanStateRequest ={reqState:"on"|"off"}
export type DeviceCompact = {ID:string,label:string,currentState:boolean,mode:ConfigMode}


export default class ClientUtils {
    //address and port on wich arduino server is listening
    static Host : string = "192.168.43.205:6262"
    static AccessToken : string //not used in dev mode

    /**a global state, stores temporary data and serve it back while fetch operations are taking place, 
     * this helps avoiding noticeable blank UI when loading e.g devviceScreen 
    */
    public static cache:{
        DevicesHeaders:DeviceCompact[], Devices:Device[],dhtLastResponse:dhtResponseType
        
    }={
        DevicesHeaders:[],
        Devices:[],
        dhtLastResponse:{readings:{temp:-1,hum:-1},error:null}
    }
    /**
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
            fetch("http://192.168.43.205:6262/devices").then(res=>(res.json()))
            .then((devicesRes:devicesCollectionResponseType)=>{
                this.cache.DevicesHeaders=devicesRes.devices//updae cache
                resolve  (devicesRes.devices)
            })
            .catch(err=>{alert(err);reject(err)})
        })
    }

    static GetDeviceState (deviceID: string): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            fetch(`http://192.168.43.205:6262/devices/${deviceID}/state`)
            .then((r)=>r.json())
            .then((responseState:BooleanStateResponse)=>{
                //alert('device set to '+ responseState.resState  )
                resolve  (responseState.resState=="off"?false:true)
            })
            .catch(err=>{alert(err);reject(err)})
        })
    }

    static SetDeviceState (deviceID: string, userState:boolean): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            let reqS:BooleanStateRequest = {reqState:userState?"on":"off"}
            fetch(`http://192.168.43.205:6262/devices/${deviceID}/state`,
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
    static GetDeviceConfig (deviceID: string, use_cache:boolean):Promise<DeviceConfig>{
        return new Promise((resolve,reject)=>{
            if(use_cache){
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    resolve(existent_cached_device.Config); return
                }
                
            }
            fetch("http://192.168.43.205:6262/devices/"+deviceID+"/config").then(res=>(res.json()))
            .then((deviceConfg:DeviceConfig)=>{
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
    /**the echong behaviour is mock-only don't use it
     * updates cache a swell
     */
    static SetDeviceConfig (deviceID: string, config:DeviceConfig):Promise<DeviceConfig>{
        return new Promise((resolve,reject)=>{
            fetch(`http://192.168.43.205:6262/devices/${deviceID}/config`,
            {method:"POST",body:JSON.stringify (config),
            headers:{'Content-Type':'application/json'}})
            .then((r)=>r.json())
            .then((responseEcho:DeviceConfig)=>{
                let existent_cached_device = this.cache.Devices.find(d=>d.ID==deviceID)
                if(existent_cached_device){
                    existent_cached_device.Config=responseEcho
                }
                else{
                    this.cache.Devices = this.cache.Devices.concat([{ID:deviceID,Config:responseEcho,currentState:false}])//todo fix false
                }
                //alert('device set to '+ responseState.resState  )
                resolve  (responseEcho)
            })
            .catch(err=>{alert(err);reject(err)})
        })
        
    }
    static GetTime (){
        
    }
    static SetTime (newDate : Date){
        
    }
    static GetSensorsInfo ():Promise<dhtResponseType>{
        return new Promise((resolve,reject)=>{
            fetch("http://192.168.43.205:6262/dht").then(res=>(res.json()))
            .then((respons:dhtResponseType)=>{
                //it is important to change a sub property of the object and not the obj itself in order for changes to take effect (doing cache.dhtLast= resp.dhtLas didn't work )
                this.cache.dhtLastResponse.readings=respons.readings;
                resolve  (respons)
            })
            .catch(err=>{alert(err);reject(err)})

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