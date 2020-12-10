const e = require("express")
const express =require("express")
const app =express();
const hbs = require("hbs")
const path = require("path")
const weatherData = require("./utils/weatherData");
const PORT =process.env.PORT || 3000



const dirpath =path.join(__dirname,"./public")

const viewpath =path.join(__dirname,"./templates/views")

const partialspath =path.join(__dirname,"./templates/partials")




app.set("view engine","hbs");
app.set("views",viewpath);
hbs.registerPartials(partialspath);
app.use(express.static(dirpath));


app.get("/",(req,res) => {
    res.render("index",{title:"Our Weather App"})
})




//localhost:300/weather?address=gandhinagar
app.get("/weather",(req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must enter an address in search bar"
        })
    }
   weatherData(address,(error,data)=>{

      if(error){
          return res.send({
              error:error
          })
      }

      
      console.log("server side data",data);
      res.send({
          temperature:data.temperature,
          description:data.description,
          cityName:data.cityName
      })
   });


})


app.get("*",(req,res) => {
    res.render("404",{title:"page not found"})
})
app.listen(PORT,() =>{

    console.log("server is up and running on port",PORT);

})
