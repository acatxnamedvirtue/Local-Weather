function getLocation() {
  $.ajax({
    url: "http://ipinfo.io/json",
    success: function(response) {
      $('#city').text(response.city);
      $('#region').text(response.region);
      $('#country').text(response.country);
    }
  });
}

function getTemp() {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + $("#city").text() + "&appid=5e257b05d64e14168750ade21ddd2b9f",
    success: function(response) {
      var temp = response.main.temp;
      window.currentTemp = (temp*(9/5))-459.67;
      window.currentUnit = "F";

      $('#temp').text(Math.floor(window.currentTemp));
      $('#desc').text(response.weather[0].main);
      getIcon(response.weather[0].main);
    }
  });
}

function getIcon(desc) {
  var description = desc.toLowerCase();
  switch (description) {
    case 'drizzle':
      $("#icon").html('<i class="wi wi-sprinkle"></i>');
      break;
    case 'clouds':
      $("#icon").html('<i class="wi wi-cloudy"></i>');
      break;
    case 'rain':
      $("#icon").html('<i class="wi wi-rain"></i>');
      break;
    case 'snow':
      $("#icon").html('<i class="wi wi-snow"></i>');
      break;
    case 'clear':
      $("#icon").html('<i class="wi wi-day-sunny"></i>');
      break;
    case 'thunderstorm':
      $("#icon").html('<i class="wi wi-thunderstorm"></i>');
      break;
    default:
      $("#icon").html('<i class="wi cloudy"></i>');
  }
}

function switchUnit() {
  if(window.currentUnit === "F") {
    window.currentUnit = "C";
    window.currentTemp = (window.currentTemp - 32) * (5/9);
  } else {
    window.currentUnit = "F";
    window.currentTemp = window.currentTemp*(9/5) + 32;
  }

  $('#unit').text(window.currentUnit);
  $('#temp').text(Math.floor(window.currentTemp));
}

$(document).ready(function() {
  getLocation();
  setTimeout(getTemp.bind(this), 500);
  $('#unit').on('click', switchUnit);
})
