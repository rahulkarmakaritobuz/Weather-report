// const place = document.getElementById("location");
const actualTemp = document.getElementById("actualTemp");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const setLocation = document.getElementById("setLocation");

let api =
  "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=Kolkata&aqi=no";

console.log(api);
const getWeatherData = async () => {
  console.log(api);
  const response = await fetch(api).then((response) => {
    return response.json();
  });
  return response;
};

let createIcon = (path) => {
  let weatherIcon = document.getElementById("weatherIcon");
  while (weatherIcon.firstChild) {
    weatherIcon.removeChild(weatherIcon.firstChild);
  }
  let elem = document.createElement("img");
  elem.setAttribute("src", path);
  elem.setAttribute("alt", "Weather Icon");
  document.getElementById("weatherIcon").appendChild(elem);
};

let setValue = () => {
  console.log(setLocation.value);
  let val = setLocation.value;
  api =
    "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +
    val +
    "&aqi=no";
  // console.log(api);
  let data = getWeatherData().then((result) => {
    console.log(result);
    // place.innerText = result.location.name;
    actualTemp.innerText = result.current.temp_f;
    feelsLike.innerText = "Feels " + result.current.feelslike_f;
    console.log(result.current.condition.text);

    let weather = result.current.condition.text;

    if (weather == "Mist") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg"
      );
    } else if (weather == "Partly cloudy" || weather == "Cloudy") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/cloudy-day-3.svg"
      );
    } else if (weather == "Snowy") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/snowy-2.svg"
      );
    } else if (weather == "Rainy" || weather == "Light rain") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/rainy-7.svg"
      );
    } else if (weather == "Clear" || weather == "Sunny") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/day.svg"
      );
    } else {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/weather.svg"
      );
    }
  });
};

document.addEventListener('keyup', (e) => {
    console.log(e);
    if(e.key==="Enter"){
        setValue();
    }
});

//V4

