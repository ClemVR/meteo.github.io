import tabDayOrder from "./inc/js/time.js";
let resultAPI;
const APIKey = "";
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision")
const weatherH = document.querySelectorAll(".heure-prevision-valeur");
const dayDiv = document.querySelectorAll(".jour-prevision-nom");
const dayTemp = document.querySelectorAll(".jour-prevision-temp")
const icon = document.querySelector(".logo-meteo");
const loading = document.querySelector(".icon-chargement");
// If the navigator accept geoloc : 
//
// or alert "ca marche po"
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
       let long = position.coords.longitude;
       let lat = position.coords.latitude;
       AppelAPI(long,lat);
    },()=> {
        alert("vous avez desactivé la geoloc, ca peut pas marcher :(")
    })
}
function AppelAPI(long, lat){
    //call the api
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKey}`)
    //we want a readable json file
    .then((reponse) => {
        return reponse.json();
    })
    //we want the datas
    .then((data) => {
        console.log(data);
        resultAPI = data;
        temps.innerText = resultAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°`
        localisation.innerText = resultAPI.timezone;

        // hours per 3h
        let heureActuelle = new Date().getHours();
        for(let i = 0; i < heure.length; i++){
            let heureIncr = heureActuelle + i * 3;
            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = "00 h"
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }
        // temp for 3h
        for(let j = 0;j <weatherH.length;j++){
            weatherH[j].innerText = `${Math.trunc(resultAPI.hourly[j*3].temp)}°`
        }
        // 3 first letters 
        for(let k = 0; k < tabDayOrder.length; k++) {
            dayDiv[k].innerText = tabDayOrder[k].slice(0,3);
        }
        for(let m = 0; m < 7; m++){
            dayTemp[m].innerText = `${Math.trunc(resultAPI.daily[m + 1].temp.day)}°`
        }
        //dynamic icon

        if(heureActuelle >= 6 && heureActuelle < 21) {
            icon.src = `inc/img/jour/${resultAPI.current.weather[0].icon}.svg`
        } else  {
           icone.src = `inc/img/nuit/${resultAPI.current.weather[0].icon}.svg`
        }


        loading.classList.add('disappearrance');

     
    })
}