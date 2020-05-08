const express = require('express')
const path = require('path')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// define pathes for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')
// set static diractory to serve
app.use(express.static(publicDirectoryPath))
// setup handlebars engine  and view location
app.set('view engine' , 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name: 'Ben Youssef Bilel'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Ben Youssef Bilel'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'help is on the way don\'t worry sit tide!',
        name:'Ben Youssef Bilel'
    })
})


app.get('/weather', (req,res)=>{
   const address=req.query.address 
   if (!address){
        return res.send({
            error:'you must provide an address'
        })
    }
    
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if (error){
          return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
        if (error){
          return res.send({error})
        }
        res.send({
            location: location,
            data:forecastdata
        })
       
      })
      })

  
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'help not found',
        name:'Ben Youssef Bilel'  
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:' page not found',
        name:'Ben Youssef Bilel'
    })
})
app.listen(port,()=>{
    console.log('server is running on port 3000')
})