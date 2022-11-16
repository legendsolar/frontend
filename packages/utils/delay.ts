export default (delay: number) : Promise<any> => new Promise(res => 
    setTimeout(res, delay))