//general purposse functions




/**
 * returns an aarray of value, unit
 * 
 * @param val  duration in seconds
 * @param accuracy 0: seconds, 1 minuts, 2 hours etc tthe results are floored to the required accuracy exp: 5m 23s would become 5 minutes
 * @example FormatDuration(3600):string[] // ["1","hour"]
 * @example FormatDuration(15):string[] // ["15","seconds"]
 * @example FormatDuration(3600*5):string[] // ["5","hours"]
 * @example FormatDuration(8000):string[] // ["2","h","30","m"]
 */
export function FormatDuration(val:number,accuracy=0):string[] {
    let isOneUnit = false; //like in example 1,2,3
    let isPlural = false; //only applies when isOneUnit
    const units = ["w","d","h","m","s"]
    const unitsFull = ["week","day","hour","minute","second"]
    let w = Math.floor(val/(3600*24*7));
    let w_r = val%(3600*24*7)
    let d = Math.floor(w_r/(3600*24));
    let d_r = w_r%(3600*24);
    let h = Math.floor(d_r/(3600));
    let h_r = d_r%(3600);
    let m = Math.floor(h_r/(60));
    let m_r = h_r%(60);
    let s = m_r;
    let res = [[0,w],[1,d],[2,h],[3,m],[4,s]].filter(t=>((t[1]>0)&&(t[0]<=4-accuracy)))
    isOneUnit = res.length==1;
    if(res.length==0) return ["0",unitsFull[4-accuracy]];
    isPlural = (res[0])[1]>1;
    
    return res.map((v,ix)=>[v[1].toString(),(isOneUnit?(unitsFull[v[0]]+(isPlural?"s":"")):units[v[0]])]).flat()
    
    
}

/**
 * given a period p, offset o and a current pos x
 * returns how much far is the first edge that appears right after (including at) the current position x
 * an egde is a pont at position n*p with n being any integer (constraints on that integer can be configured in next version of this function)
 * 
 * @param p period aka distances separating edges
 * @param o offset at wich egdes are positioned with respect to zero
 * @param x the current positon
 */
export function p_diff(p:number,o:number,x:number) {
    return p- ((x-o)%p)
}