const request= require('postman-request')


const forecast = (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=eb4104337348ebc69a6be4b1cb0ee3ef&query='+latitude+','+longitude
request({url:url, json:true},(error,response)=>{
    if (error){
        callback('cannot connect to the weather service',undefined)
    }
    else if(response.body.error){
      callback('unable to find location',undefined)
    }
    else{
        const data = response.body.current
        const {temperature,feelslike}=response.body.current
        callback(undefined,'It is '+response.body.location.localtime+'. the temperature is '+ temperature + ' degress' +' and it feels like '+feelslike + ' degress ,it is '+response.body.current.weather_descriptions[0]+'. and the humidity is '+response.body.current.humidity+' %.')
    }

})
}


module.exports= forecast