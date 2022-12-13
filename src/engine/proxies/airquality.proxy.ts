export interface ApiAirMeasurementsModel {
    results: Array<{
        parameter:string,
        value:number,
        lastUpdated:string,
        unit:string,
    }>
}

const baseUrl = 'https://api.openaq.org/v2/latest?';

export const getMeasurements = async (city:string): Promise<Array<ApiAirMeasurementsModel>> => {
    try{
        //const options = {method: 'GET', headers: {accept: 'application/json'}};
        //https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=Chicago&order_by=lastUpdated&dumpRaw=false', options)
        const url = baseUrl +`limit=1&city=${city}`,
             apiOptions = {
                 Accept:'application/json',
                 "Content-Type":'application/json'
             } as RequestInit
        const apiresponse = await fetch(url, apiOptions);
        if (apiresponse && apiresponse.ok){
            const apiresult = (await apiresponse.json()) as Array<ApiAirMeasurementsModel>;
            if (apiresult) return apiresult
        }
    }catch (ex) {
        return await Promise.reject()
    }
};