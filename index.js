const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const input = document.querySelector(".search-box input");

search.addEventListener("click", () => {

  const APIKey = "0d4e680b64744fe79d1172909230710";
  const city = document.querySelector(".search-box input").value;
  console.log(city)

  if (city === "") return;

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`
  )
    .then(response => response.json())
    .then((json) => {
      if (json?.error?.code == 1006) {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.style.scale = "1";
        error404.style.opacity = "1";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");
      const conditionCloud = [1003, 1006, 1009]
      const conditionMist = [1030, 1135, 1147]
      const conditionRain = [1063, 1066, 1069, 1072, 1114, 1117, 1150, 1153, 1152, 1153, 1168, 1183, 1186, 1189, 1195, 1204]
      const conditionThunder = [1273, 1276, 1279, 1282]
      switch (json.current.condition.code) {
        case  1000:
          image.src = "images/clear.png";
          break;
        case checkerCloud(json.current.condition.code):
          image.src = "images/cloud.png";
          break;
        case checkerMist(json.current.condition.code):
          image.src = "images/mist.png";
          break;
        case checkerRain(json.current.condition.code):
          image.src = "images/rain.png";
          break;
        case checkerThunder(json.current.condition.code):
          image.src = "images/thunder.png";
          break;
        default:
            image.src = "images/clear.png";
      };

      function checkerCloud(res) {
        return conditionCloud.includes(res) ? res : {}
      }

      function checkerMist(res) {
        return conditionMist.includes(res) ? res : {}
      }

      function checkerRain(res) {
        return conditionRain.includes(res) ? res : {};
      }

      function checkerThunder(res) {
        return conditionThunder.includes(res) ? res : {};
      }
      temperature.innerHTML = `${json.current.temp_c}<span>°C</span>`;
      description.innerHTML = `${json.current.condition.text}`;
      humidity.innerHTML = `${json.current.humidity}%`;
      wind.innerHTML = `${json.current.wind_kph}Km/ph`

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
});

input.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    document.querySelector(".search-box button").click();
  }
});


