const request =require("request")

const wetherDat =(address,callback) =>{
    const url ="http://api.openweathermap.org/data/2.5/weather?q=" + address + "&appid=518f73c295d9ff269a6941df4e484eb5"
    console.log(url);
    request({url:url,json:true}, (err, data) => {
       
        if(err){
            callback("Can't fetch data from open wether map api",undefined)
        }else if (data.body.main && data.body.weather && data.body.name){
            callback(undefined,{
                temperature: data.body.main.temp,
                description: data.body.weather[0].description,
                cityName: data.body.name

            })
        }
        else{
         callback(" Unable to find required data,try another location",undefined)   
        }
        
    })


}
 module.exports =wetherDat;
