const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.addEventListener("load", () => {
  let long;
  let lat;
  const tempDescription = document.querySelector(".temp-description");
  const tempDegree = document.querySelector(".temp-degree");
  const temperatureDegree = document.querySelector(".temp-degree");
  const locationTimeZone = document.querySelector(".location-timezone");
  const tempSection = document.querySelector(".temp-section");
  const tempSpan = document.querySelector(".temp-section span");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // api key and weather values from darksky.net;
      // lat = 6.5241088; long = 3.3652736;

      // proxy for solving browser origin issues
      const proxy = "https://cors-anywhere.herokuapp.com/"

      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
      .then(response => response.json())
      .then(data => {
        displayData(data);
        setIcon(data.currently.icon, document.querySelector(".icon"));
        tempSection.addEventListener("click", () => changeTemperature(temperature))
      })
    });
  }

  function displayData(data) {
    const {temperature, summary} = data.currently;
        tempDegree.textContent = temperature;
        tempDescription.textContent = summary;
        locationTimeZone.textContent = data.timezone;
  }
  
  // skycon setup
  function setIcon(icon, iconID) {
    const skycons = new Skycons({color: "orange"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();  /*--this would replace every line with an _ */
    console.log(currentIcon)
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

  function changeTemperature(temp) {
    let celcius = (temp - 32) * (5/9);
    if (tempSpan.textContent === "F") {
      tempSpan.textContent = "C";
      tempDegree.textContent = Math.floor(celcius)
    } else {
      tempSpan.textContent = "F";
      tempDegree.textContent = temp;
    }
  }

