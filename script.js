var inputStore = JSON.parse(localStorage.getItem("inputStore")) || [];

function displayWeatherInfo(){   
 
 var city = $(this).attr("data-name")

 // Here we are fetching data for current API
 var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
   "q=" + city + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"

   $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var iconId = response.weather[i].icon;
    $("#icon").html("<img class='currIcon' src='https://openweathermap.org/img/wn/" + iconId + "@2x.png'>").attr('SameSite=None');
    // $("#icon").html("<img class='currIcon' src='https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png'>").attr('SameSite=None');
    // $("<img src='http://openweathermap.org/img/wn/" + attr.weather[0].icon + ".png'>")
    
    $(".location").html("<h1>" + response.name + "</h1>")
    $(".temperature").html("<p> Temperature: " +  response.main.temp + " °F</p>")
    $(".humidity").html("<p> Humidity: " + response.main.humidity + " %</p>")
    $(".wind-speed").html("<p> wind-speed: " + response.wind.speed + " MPH</p>")
    
    // $.ajax({
    //     url: "https://api.openweathermap.org/data/2.5/uvi/history?" +
    //     "&lat=" + lat +"$lon=" + lon + "&appid=166a433c57516f51dfab1f7edaed8413" ,
    //     method: "GET"
    //   }).then(function(response) {
    //     console.log(response)
    //     $(".uv-index").html()
    // }); 

    lat = toString(response.coord.lat);
    lon = toString(response.coord.lon);
    });
    
    // here is my attempt for grabbing the UV Index
    var uviURL = "https://api.openweathermap.org/data/2.5/uvi/history?" +
    "&lat=" + lat +"$lon=" + lon + "&appid=166a433c57516f51dfab1f7edaed8413"
    $.ajax({
        url: uviURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        $(".uv-index").html("<p> UV index: " +  + "</p>")

    });
    
    // forecast data API
    var city = $(this).attr("data-name")
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + city + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"
    $.ajax({
        url: forecastURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        $(".date1").html("<h4>" + response.list[4].dt_txt + "</h4>")
        // $("icon1").html("<p>" + response.weather[0].icon + "</p>")
        $(".temp1").html("<p> Temp: " + response.list[4].main.temp + " °F</p>")
        $(".humid1").html("<p> Humidity: " + response.list[4].main.humidity + " %</p>")

        $(".date2").html("<h4>" + response.list[4].dt_txt + "</h4>")
        // $("icon2").html("<p>" + response.list[4].dt_txt + "</p>")
        $(".temp2").html("<p> Temp: " + response.list[4].main.temp + " °F</p>")
        $(".humid2").html("<p> Humidity: " + response.list[4].main.humidity + " %</p>")

        $(".date3").html("<h4>" + response.list[4].dt_txt + "</h4>")
        // $("icon3").html("<p>" + response.list[4].dt_txt + "</p>")
        $(".temp3").html("<p> Temp: " + response.list[4].main.temp + " °F</p>")
        $(".humid3").html("<p> Humidity: " + response.list[4].main.humidity + " %</p>")

        $(".date4").html("<h4>" + response.list[4].dt_txt + "</h4>")
        // $("icon4").html("<p>" + response.list[4].dt_txt + "</p>")
        $(".temp4").html("<p> Temp: " + response.list[4].main.temp + " °F</p>")
        $(".humid4").html("<p> Humidity: " + response.list[4].main.humidity + " %</p>")

        $(".date5").html("<h4>" + response.list[4].dt_txt + "</h4>")
        // $("icon5").html("<p>" + response.list[4].dt_txt + "</p>")
        $(".temp5").html("<p> Temp: " + response.list[4].main.temp + " °F</p>")
        $(".humid5").html("<p> Humidity: " + response.list[4].main.humidity + " %</p>")
    });
}

function renderInput(){
    $("#historyContainer").empty();
   
for (var i  = 0; i < inputStore.length; i++){
    var inputrow = $("<button>");
    inputrow.css({ // adding CSS to my new appended button
      "margin-top": "5px",
      "border-radius": "5px",
      "border": "solid grey 2px",
      "text-align": "center",
      "margin-left": "2%",
      "width": "100%",
      "height": "50px",  });  
    inputrow.addClass("city");
    inputrow.attr("data-name", inputStore[i]);
    inputrow.text(inputStore[i]);
    
    $("#historyContainer").prepend(inputrow)
    $("#mainPage").css({"display": "block"})
}
}

$("#searchBtn").on("click", function (event) {
event.preventDefault();
// setting my citis as the userInput value, trimming to make it nice
var city = $("#userInput").val().trim(); // pulling out the typed user input when the search button is clicked
inputStore.push(city);
localStorage.setItem("inputStore", JSON.stringify(inputStore));
console.log(city);

$("#mainPage").css({"display": "block"})
renderInput();
});

$(document).on("click", ".city", displayWeatherInfo);
document.cookie = 'cross-site-cookie=bar; SameSite=None';
renderInput();
// pull display  of API info on the screen out of this funciton to store in local storage (maybe declare this in the global variable? ) 