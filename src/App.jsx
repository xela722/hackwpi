import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./Login.jsx";

function test(testy){
  console.log(this.findSongs(this.getPhrase()))
}

function findSongs(phrase) {
	var length = songLength(phrase);
	const largest_length = length;
	while (length > 0) {
		//check combinations
		for (var i=0; i<=largest_length-length; i++) {
			var possibleName = getWords(phrase, i, length);
			if (inDataBase(possibleName)) {
				var left_str = getLeftHalf(phrase, i);
        var right_str = getRightHalf(phrase, i+length+1);
        
				return findSongs(left_str) + "|" + possibleName + "|" + findSongs(right_str);
			}
		}
		length--;
		//nothing at this level! guess we go deeper!
	}
	return "";
}

//gets number of words in the phrase
function songLength(phrase) {
  return phrase.split(" ").length;
}

//TODO: edit to communicate with Spotify
function inDataBase(name){
	name = name.toLowerCase();
  var arr = ["I", "Kinda Like", "You", "and", "I Wanted to Tell You"];
  for (var i = 0; i < arr.length; i++){
    if (arr[i].toLowerCase() == name) {
    	return true;
    }
  }
  return false;
}


//returns the string that follows the following 2 conditions:
//starts with the (ith) word 
//contains j words
function getWords(phrase, i, j) {
  var arr = phrase.split(" ");
  var ans = "";
  for(var k=i; k < i + j; k++){
    ans += arr[k] + " ";
  }
  return ans.substring(0, ans.length - 1);

}
//get i words, starting at the beginning
function getLeftHalf(phrase, i) {
  var arr = phrase.split(" ");
  var ans = "";
  for (var j = 0; j < i; j++ ){
    ans += arr[j] + " ";
  }
  return ans;
}

//get word #i and beyond!
function getRightHalf(phrase, i) {
  var arr = phrase.split(" ");
  var ans = "";
  for (var j = i-1; j < arr.length; j++ ){
    ans += arr[j] + " ";
  }
  return ans;
}

class App extends React.Component{ 
  constructor(props){
    super(props)
    this.findSongs = findSongs;
    this.test = test;
  }

  getPhrase(){
    return document.getElementById('forrest-kun').value;
  }
  render(){
    return(
      <div className="App">
        <h1>Welcome to Memify</h1>
          <header>
          <Login/>
          <p>Create meme spotify playlists.</p>
          <p>This was created at Hack@WPI 2020 by Alex Bolduc, Luke Deratzou, Timothy Kwan, and Frederick (Forrest) Miller</p>
          <fieldset>
          <p>
            <textarea id="forrest-kun"> </textarea>
          </p>
          </fieldset>
          <button onClick={this.test.bind(this)} className="explorebutton">GO</button>
          <p id="alex-senpai"></p>
          </header>
      </div>
    );
  };
}

export default App;
