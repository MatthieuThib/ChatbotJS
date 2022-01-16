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
        const result = response.data.shift(); // We access the first element
        locationKey = result.Key; // We store the location key
        realLocationName = result.EnglishName; // We store the location's english name
        realLocationCountryName = result.Country.EnglishName; // We store the location country's english name
      })
      .catch(error => { console.log(error);
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