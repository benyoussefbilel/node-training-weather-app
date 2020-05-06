const request= require('postman-request')

const geocode =(address,callback)=>{
    const gurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmlsZWxiZW55b3Vzc2VmIiwiYSI6ImNrOWhydjc4NjBlaHEzZW54cW83cGM5eW4ifQ.bSPGRk3g8Oxg3XRD9--9kQ&limit=1'
    
    request( { url: gurl, json: true},(error,{body}={})=>{
        if(error){
            callback('cannot connect to the mapbox server')
        }
        else if(body.query.length===0) {
          callback('unable to find the location')
        }
       else{
        const [longitude,latitude] = body.features[0].center
        const location=body.features[0].place_name
        callback(undefined,{latitude,
                            longitude,
                            location
        })
        }
    })
    
}
module.exports= geocode