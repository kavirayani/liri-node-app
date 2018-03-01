require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require ("request");
var fs = require("fs");
var keys = require("./keys.js");

var spotifykeys = new spotify(keys.spotify);
var twitterkeys = new twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "my-tweets":
      tweets();
      break;
  
    case "spotify-this-song":
    Spotify(value);
      break;
  
    case "movie-this":
      omdb(value);
      break;
  
    case "do-what-it-says":
    doWhatItSays();
      break;
  }


function tweets()  {
    
    var params = {screen_name: 'jyotsna_k', count: 20};    
twitterkeys.get('statuses/user_timeline',params, function(error, tweets,response)
{
if(!error){
    console.log(tweets);
}
else{
console.log(tweets);
console.log(response);
}
}
);

};


 function Spotify(songName) {

    if (songName === undefined) {
      songName = "What\"s my age again";
    }
  
    spotifykeys.search({
      type: "track",
      query: songName
    }, function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
  
      var songs = data.tracks.items;
  
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists);
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    });
  };
  //end of function spotify

//function for searching a movie name
function omdb(movie)
{
if(movie === undefined)
{
movie = "Mr Nobody";
}

var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
request(url, function(error, response, body)
{
if(!error &&  response.statusCode === 200)
{
    var jsonData = JSON.parse(body);

    console.log("Title: " + jsonData.Title);
    console.log("Year: " + jsonData.Year);
    console.log("Rated: " + jsonData.Rated);
    console.log("IMDB Rating: " + jsonData.imdbRating);
    console.log("Country: " + jsonData.Country);
    console.log("Language: " + jsonData.Language);
    console.log("Plot: " + jsonData.Plot);
    console.log("Actors: " + jsonData.Actors);
    console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
}

}


);//end of request

};//end of function omdb


function doWhatItSays(){
fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
console.log(data);
//var dataArr = data.split(",");
 // console.log(dataArr);
}//end of function(err,data)
)//end of fs.readfile
}//end of function doWhatItSays


