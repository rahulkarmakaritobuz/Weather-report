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
  getWeatherData().then((result) => {
    console.log(result);
    actualTemp.innerText = result.current.temp_f;
    feelsLike.innerText = "Feels " + result.current.feelslike_f;
    console.log(result.current.condition.text);

    let weather = result.current.condition.text;

    if (weather === "Mist") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg"
      );
    } else if (weather === "Partly cloudy" || weather === "Cloudy") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/cloudy-day-3.svg"
      );
    } else if (weather === "Snowy") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/snowy-2.svg"
      );
    } else if (weather === "Rainy" || weather === "Light rain") {
      createIcon(
        "./assets/images/amcharts_weather_icons_1.0.0/animated/rainy-7.svg"
      );
    } else if (weather === "Clear" || weather === "Sunny") {
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

// Input suggestion part
let suggestions = [
  "Kolkata",
  "London",
  "Dubai",
  "Delhi",
  "Solon",
  "Kathmandu",
  "Amazonia",
  "Africa",
  "Goa",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Surat",
  "Pune",
  "Jaipur",
  "Agra",
  "Raipur",
  "Kota",
  "Allahabad",
  "Durgapur",
];

const searchWrapper = document.querySelector(".search-input");
const suggBox = searchWrapper.querySelector(".autocom-box");

setLocation.onkeyup = (e) => {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add("active");

    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active");
  }
};

function select(element) {
  let selectData = element.textContent;
  setLocation.value = selectData;
  searchWrapper.classList.remove("active");
  setValue();
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    let userValue = setLocation.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}

document.addEventListener("keyup", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    searchWrapper.classList.remove("active");
    setValue();
  }
});
