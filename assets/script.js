// setting local stoarage as an or with my empty array to feed cities into
var inputStore = JSON.parse(localStorage.getItem("inputStore")) || [];

function displayWeatherInfo() {
  var city = $(this).attr("data-name");

  // Here we are fetching data for current weather from the weather API
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    city +
    "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";
  // fetchin data using AJAX
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // doing a little math to convert the unix time into a readable date
    let unixMath = response.coord.dt * 1000;
    var date = Date(unixMath);
    // giving some loaction data here
    $(".location").html(
      "<h1>" +
        response.name +
        " " +
        date +
        `<img class='currIcon' src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png">` +
        "</h1>"
    );
    $(".temperature").html(
      "<p style='font-size: 25px'> Temperature: " +
        response.main.temp +
        " °F</p>"
    );
    $(".humidity").html(
      "<p style='font-size: 25px'> Humidity: " +
        response.main.humidity +
        " %</p>"
    );
    $(".wind-speed").html(
      "<p style='font-size: 25px'> wind-speed: " +
        response.wind.speed +
        " MPH</p>"
    );
    // assigning lat and lon to be used in the API URL for the UV Index
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    // here is my attempt for grabbing the UV Index
    var uviURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=166a433c57516f51dfab1f7edaed8413";
    $.ajax({
      url: uviURL,
      method: "GET",
    }).then(function (uv) {
      console.log(uv);
      $(".uv-index").html(
        "<p style='font-size: 25px'> UV index: " + uv.value + "</p>"
      );
    });
  });

  // forecast data API
  var city = $(this).attr("data-name");
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" +
    city +
    "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // here is the assignments for our forecast data
    $(".date1").html("<h5>" + response.list[4].dt_txt + "</h5>");
    $(".icon1").html(
      `<img class='currIcon' src="https://openweathermap.org/img/wn/${response.list[4].weather[0].icon}.png">`
    );
    $(".temp1").html("<p> Temp: " + response.list[4].main.temp + " °F</p>");
    $(".humid1").html(
      "<p> Humidity: " + response.list[4].main.humidity + " %</p>"
    );

    $(".date2").html("<h5>" + response.list[12].dt_txt + "</h5>");
    $(".icon2").html(
      `<img class='currIcon' src="https://openweathermap.org/img/wn/${response.list[12].weather[0].icon}.png">`
    );
    $(".temp2").html("<p> Temp: " + response.list[12].main.temp + " °F</p>");
    $(".humid2").html(
      "<p> Humidity: " + response.list[12].main.humidity + " %</p>"
    );

    $(".date3").html("<h5>" + response.list[20].dt_txt + "</h5>");
    $(".icon3").html(
      `<img class='currIcon' src="https://openweathermap.org/img/wn/${response.list[20].weather[0].icon}.png">`
    );
    $(".temp3").html("<p> Temp: " + response.list[20].main.temp + " °F</p>");
    $(".humid3").html(
      "<p> Humidity: " + response.list[20].main.humidity + " %</p>"
    );

    $(".date4").html("<h5>" + response.list[28].dt_txt + "</h5>");
    $(".icon4").html(
      `<img class='currIcon' src="https://openweathermap.org/img/wn/${response.list[28].weather[0].icon}.png">`
    );
    $(".temp4").html("<p> Temp: " + response.list[28].main.temp + " °F</p>");
    $(".humid4").html(
      "<p> Humidity: " + response.list[28].main.humidity + " %</p>"
    );

    $(".date5").html("<h5>" + response.list[36].dt_txt + "</h5>");
    $(".icon5").html(
      `<img class='currIcon' src="https://openweathermap.org/img/wn/${response.list[36].weather[0].icon}.png">`
    );
    $(".temp5").html("<p> Temp: " + response.list[36].main.temp + " °F</p>");
    $(".humid5").html(
      "<p> Humidity: " + response.list[36].main.humidity + " %</p>"
    );
  });
}

function renderInput() {
  $("#historyContainer").empty();
  // loop for each instance of the city search
  for (var i = 0; i < inputStore.length; i++) {
    var inputrow = $("<button>");
    inputrow.css({
      // adding CSS to my new appended button
      "margin-top": "5px",
      "border-radius": "5px",
      border: "solid grey 2px",
      "text-align": "center",
      "margin-left": "2%",
      width: "100%",
      height: "50px",
    });
    inputrow.addClass("city");
    inputrow.attr("data-name", inputStore[i]);
    inputrow.text(inputStore[i]);

    $("#historyContainer").prepend(inputrow);
    $("#mainPage").css({ display: "block" });
  }
}

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  // setting my citis as the userInput value, trimming to make it nice
  var city = $("#userInput").val().trim(); // pulling out the typed user input when the search button is clicked
  inputStore.push(city);
  localStorage.setItem("inputStore", JSON.stringify(inputStore));
  console.log(city);
  // mainpage display block so that our results will show up once the seach button is clicked
  $("#mainPage").css({ display: "block" });
  renderInput();
  displayWeatherInfo();
});

// click on the document for the city to display the weather info
$(document).on("click", ".city", displayWeatherInfo);

renderInput();
// pull display  of API info on the screen out of this funciton to store in local storage (maybe declare this in the global variable? )
