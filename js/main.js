const place = document.getElementById('location');
const actualTemp = document.getElementById('actualTemp');
const feelsLike = document.getElementById('feelsLike');
const weatherIcon =document.getElementById('weatherIcon');

const getWeatherData = async() => {
    const response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=London&aqi=no"
      ).then((response)=>{
          return response.json();

      });
      return response;
    //   console.log(response);
    //   console.log(response.location);
    //   console.log(response.json);
}
let data=getWeatherData()
.then((result)=>{
    console.log(result);
    place.innerText=result.location.name;
    actualTemp.innerText=result.current.temp_f;
    feelsLike.innerText="Feels "+result.current.feelslike_f;
    if(result.current.condition.text=="Overcast"){
        weatherIcon.classList.add="fa-cloud";
    }
    if(result.current.condition.text=="Sunny"){
        weatherIcon.classList.add="fa-sun";
    }
})

// console.log(data);
// console.log(data.PromiseResult);

// place.innerText=data.location;