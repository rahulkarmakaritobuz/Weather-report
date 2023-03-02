const place = document.getElementById('location');
const actualTemp = document.getElementById('actualTemp');
const feelsLike = document.getElementById('feelsLike');
const weatherIcon = document.getElementById('weatherIcon');
const setLocation = document.getElementById('setLocation');

var api="";


console.log(api);
const getWeatherData = async () => {
    console.log(api);
    const response = await fetch(api)
    .then((response) => {
        return response.json();

    });
    return response;
    //   console.log(response);
    //   console.log(response.location);
    //   console.log(response.json);
}
let setValue = () => {
    console.log(setLocation.value);
    let val=setLocation.value;
    api="http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q="+val+"&aqi=no";   
    // console.log(api);
    let data = getWeatherData()
    .then((result) => {
        console.log(result);
        place.innerText = result.location.name;
        actualTemp.innerText = result.current.temp_f;
        feelsLike.innerText = "Feels " + result.current.feelslike_f;
        console.log(result.current.condition.text);
        if (result.current.condition.text == "Overcast") {
            weatherIcon.className += " fa-cloud ";
        }
        if (result.current.condition.text == "Partly cloudy") {
            weatherIcon.className += " fa-cloud-sun ";
        }
        if (result.current.condition.text == "Sunny") {
            weatherIcon.className = " fa-sun text-warning";
        }
    })
}

// console.log(data);
// console.log(data.PromiseResult);

// place.innerText=data.location;
