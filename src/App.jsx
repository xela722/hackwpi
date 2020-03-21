import React from 'react';
import './App.css';
import Login from "./Login.jsx";

let auth =getAuth();

async function findSongs(phrase) {
	let phrases = await getPhrases(phrase);
	console.log(phrases);

	findSongByName(phrases[phrases.length-1], auth);


}

function getPhrases(phrase){
	let words = phrase.split(" ");
	let returnPhrases = [];


	for(let i=words.length; i>0; i--){
		let buffer = getPhrasesOfLength(phrase, i);
		for(let j=0; j<buffer.length; j++){
			returnPhrases.push(buffer[j]);
		}
	}

	return returnPhrases;
}

function getPhrasesOfLength(phrase, length){
	let words = phrase.split(" ");
	let returnPhrases = [];

	if(length>words.length){
		console.log("Length too long");
		return null;
	}else{
		//Do Stuff
		for(let i=0; i<=words.length-length; i++){
			returnPhrases.push(words.slice(i, i+length).join(" "));
		}
	}

	return returnPhrases;
}


async function findSongByName(name, auth){
	let request = await fetch("https://api.spotify.com/v1/search?q="+name+"&type=track&market=US", {
		method: "GET",
		headers: {
			'Authorization': 'Bearer ' + auth
		}
	})

	let data = await request.json();
	let songs = [];

	data["tracks"]["items"].forEach((track)=> {
		songs.push(track["name"]);
	});

	console.log(songs);
}

function getAuth(){
	return window.location.hash.substring(1).split("&")[0].split("=")[1]
}

class App extends React.Component{
	constructor(props){
		super(props)
		this.findSongs = findSongs;
		this.getAuth = getAuth;

		this.state = {value: ""}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({value: event.target.value})
	}


	getPhrase(){
		if(this.componentDidMount){
			return document.getElementById('forrest-kun').value;
		}else{
			return "ERROR"
		}
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
			<input value={this.state.value} onChange={this.handleChange} id='forrest-kun'/>
			</p>
			</fieldset>
			<button onClick={this.findSongs.bind(this, this.state.value)}>Go</button>
			<p id="alex-senpai"></p>
			</header>
			</div>
		);
	};
}

export default App;
