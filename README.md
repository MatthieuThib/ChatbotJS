# WeatherChatbotJS
## Description
The aim of this project was to build a Rule-based Weather bot in JavaScript.

## Team
- Chloé TEMPO
- Sebastien YUNG
- Matthieu THIBAUT

## Table Of Contents
- [Vanilla](./Vanilla/)
This folder contains the entire project.
  - [Colors](./Vanilla/Colors/index.js)
  Inside this folder, a JavaScript file contains a style object that will be used to change the display color of the node js command prompt.
  - [Matcher](./Vanilla/Matcher/index.js)
  Inside this folder, a JavaScript file contains a function that search matching patterns.
  - [Patterns](./Vanilla/Patterns/index.js)
  Inside this folder, a JavaScript file contains a pattern object that assign a value at a regular expression.
  - [Weather](./Vanilla/Weather/index.js)
  Inside this folder, the JavaScript uses a weather API to fetch weather forecasts for a specific location and timestamp.
  - [app.js](./Vanilla/Weather/index.js)
  The main script of this project, define the structure and the interactions with the bot.
- [ReadMe.md](./README.md)
You are on the ReadMe.md file. 

## How it works
This bot simply works by gathering information in the user's sentence like the location and the timestamp.
Then he uses the accuweather API to fetch weather data.
After some data processing, he reply back to the user.     
Information about Accuweather API: [https://developer.accuweather.com/apis](https://developer.accuweather.com/apis)

## Example
Here, a quick overview of an iteraction with the weather bot !
   
   
![image](https://user-images.githubusercontent.com/94895152/149672957-9874c320-2e2d-40b5-95bb-5bfad2e3874f.png)
