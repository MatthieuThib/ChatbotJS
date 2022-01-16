"use strict";

import axios from 'axios';
import style from '../Colors/index.js';

const apikey = 'XyLCxvwEPW6c2p22RPuak8xUf1JcR0hZ';
//const apikey = 'L10wAPGw0NeLjOjuPcZvUoixSSRS0tHy'; 
//const apikey = 'Qa26JJgN59k3r7QOzxjTGqfGCZG6Jgao';

// All Accuweather APIs can be find here : https://developer.accuweather.com/apis

/**
 * This function uses the accuweather api to fetch weather data for a specific location and timestamp
 * It is composed of 2 requests
 * @param {String} location city entered by the user
 * @param {String} time timestamp entered by the user
 */
const getWeather = async (location, time) => {
  
  let locationKey = undefined; // id of the city entered by the user
  let realLocationName = undefined; // location
  let realLocationCountryName = undefined; // location's country

  // First Request: We search for the location key of the city entered by the user
  // Doc : https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/search
  await axios.get('http://dataservice.accuweather.com/locations/v1/search?apikey=' + apikey, { params: { q: location }
    })
      .then(response => {
        // On récupère le premier résultat dans la liste
        const result = response.data.shift();
        // On stocke la locationKey dans la variable pour l'utiliser plus tard
        locationKey = result.Key;
        // On stocke le nom de la ville dans la variable pour l'utiliser plus tard
        realLocationName = result.EnglishName;
        // On stocke le nom du pays dans la variable pour l'utiliser plus tard
        realLocationCountryName = result.Country.EnglishName;
      })
      .catch(error => {
        console.log(error);
      });

  // Now that we have the location key corresponding to the city entered by the user, 
  // We can focus on getting the weather 

  // Second Request: We get the current weather or the forecasts depending on the time parameter fetched in the user question.
  // Doc : https://developer.accuweather.com/accuweather-forecast-api/apis

  // switch loop to assign the good url depending on the user's request
  let url = undefined;
  switch (time) {

    case undefined: //(user did not specified timestamp) -> We display the current weather
      url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=` + apikey;
      break;

    case 'today': // Current weather (same request as for undefined time parameter)
      url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=` + apikey;
      break;
    
    case 'tomorrow': // Tomorrow weather forecasts
      url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=` + apikey;
      break;

    case '5 days': // Weather forecasts for the next 5 days
      url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=` + apikey;
  }
  
  //console.log(url); // To verify url

  // Now that we assigned the good url, we can send the http request.
  await axios.get(url)
      .then(response => {
        // Depending on the value of time variable, we do not display the same data.
        if (time == undefined || time == 'today')
        {
          console.log(`${style.fontColors.cyan}%s${style.reset}`, "\nHere's the current weather in " + realLocationName + ", " + realLocationCountryName);
          console.log(`${style.fontColors.yellow}%s${style.reset}`, "   Weather : " + response.data[0].WeatherText);
          console.log(`${style.fontColors.red}%s${style.reset}`, "   Temperature : " + response.data[0].Temperature.Imperial.Value + " °" + response.data[0].Temperature.Imperial.Unit);
        }
        else if (time == 'tomorrow')
        {
          console.log(`${style.fontColors.cyan}%s${style.reset}`,"\nHere's today's weather in " + realLocationName + ", " + realLocationCountryName);
          console.log(`${style.fontColors.yellow}%s${style.reset}`, "   Day : " + response.data.DailyForecasts[0].Day.IconPhrase);
          console.log(`${style.fontColors.yellow}%s${style.reset}`, "   Night : " + response.data.DailyForecasts[0].Night.IconPhrase);
          console.log(`${style.fontColors.red}%s${style.reset}`, "   Max temperature : " + response.data.DailyForecasts[0].Temperature.Maximum.Value + " °" + response.data.DailyForecasts[0].Temperature.Maximum.Unit);
          console.log(`${style.fontColors.blue}%s${style.reset}`, "   Min temperature : " + response.data.DailyForecasts[0].Temperature.Minimum.Value + " °" + response.data.DailyForecasts[0].Temperature.Minimum.Unit);
        }
        else if (time == '5 days')
        {
          console.log(`${style.fontColors.cyan}%s${style.reset}`, "\nHere's weather forecasts for the next 5 days in " + realLocationName + ", " + realLocationCountryName);
          // for loop parsing the forcasts for the next five days
          for (let i = 0; i < response.data.DailyForecasts.length; i++) {
            console.log(`${style.fontColors.cyan}%s${style.reset}`,"\n- Date : " + response.data.DailyForecasts[i].Date.slice(0, 10));   //"2022-01-16T07:00:00+01:00"
            console.log(`${style.fontColors.yellow}%s${style.reset}`, "   Day : " + response.data.DailyForecasts[i].Day.IconPhrase);
            console.log(`${style.fontColors.yellow}%s${style.reset}`, "   Night : " + response.data.DailyForecasts[i].Night.IconPhrase);
            console.log(`${style.fontColors.red}%s${style.reset}`, "   Max temperature : " + response.data.DailyForecasts[i].Temperature.Maximum.Value + " °" + response.data.DailyForecasts[i].Temperature.Maximum.Unit);
            console.log(`${style.fontColors.blue}%s${style.reset}`, "   Min temperature : " + response.data.DailyForecasts[i].Temperature.Minimum.Value + " °" + response.data.DailyForecasts[i].Temperature.Minimum.Unit);
          } 
        }})
      .catch(error => { console.log(error); });
}

export default getWeather;




















//****************************************************************************************************************************************** */

// Ca c'est juste un example d'url de requete comme celle de la première requête :
// http://dataservice.accuweather.com/locations/v1/search?apikey=qDI5YoJ7U5KBFET8wHmurpftsclAKkKg&q=Paris&language=en&details=true

// Replacer la apikey si elle n'est pas valide (aka error 401) et ouvrez sur votre navigateur (Firefox par exemple) et vous pourrez voir le résultat renvoyé :)




// Ca en dessous, c'est juste un exemple de ce que peux retourner la 2e requête :)
// Mais vous pouvez tester ici : https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/daily/1day/%7BlocationKey%7D

// const obj = {
//   "Headline": {
//     "EffectiveDate": "2022-01-16T19:00:00+01:00",
//     "EffectiveEpochDate": 1642356000,
//     "Severity": 5,
//     "Text": "Expect showers Sunday evening",
//     "Category": "rain",
//     "EndDate": "2022-01-17T01:00:00+01:00",
//     "EndEpochDate": 1642377600,
//     "MobileLink": "http://www.accuweather.com/en/fr/paris/623/daily-weather-forecast/623?lang=en-us",
//     "Link": "http://www.accuweather.com/en/fr/paris/623/daily-weather-forecast/623?lang=en-us"
//   },
//   "DailyForecasts": [
//     {
//       "Date": "2022-01-15T07:00:00+01:00",
//       "EpochDate": 1642226400,
//       "Temperature": {
//         "Minimum": {
//           "Value": 31,
//           "Unit": "F",
//           "UnitType": 18
//         },
//         "Maximum": {
//           "Value": 45,
//           "Unit": "F",
//           "UnitType": 18
//         }
//       },
//       "Day": {
//         "Icon": 3,
//         "IconPhrase": "Partly sunny",
//         "HasPrecipitation": false
//       },
//       "Night": {
//         "Icon": 38,
//         "IconPhrase": "Mostly cloudy",
//         "HasPrecipitation": false
//       },
//       "Sources": [
//         "AccuWeather"
//       ],
//       "MobileLink": "http://www.accuweather.com/en/fr/paris/623/daily-weather-forecast/623?day=1&lang=en-us",
//       "Link": "http://www.accuweather.com/en/fr/paris/623/daily-weather-forecast/623?day=1&lang=en-us"
//     }
//   ]
// };