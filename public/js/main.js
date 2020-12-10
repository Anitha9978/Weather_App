


const weatherform =document.getElementById("weatherform");
const search =document.getElementById("weatherinput")

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.innerHTML = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);

console.log( new Date().getMonth())

weatherform.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(search.value);

    locationElement.innerHTML = "Loading..."
    tempElement.innerHTML ="";
    weatherCondition.innerHTML ="";
    const weatherApi = "/weather" + "?address=" +search.value;
    fetch(weatherApi).then(response =>{
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.innerHTML = data.cityName;
                tempElement.innerHTML = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.innerHTML = data.description.toUpperCase();
            }
        }) 
    });
})