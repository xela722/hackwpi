import React from 'react'
import SpotifyLogin from 'react-spotify-login';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "9b19b563f39d450bbff64778f1019250";
const redirectUri = "http://localhost:3000";
const scopes = [
	"user-read-private",
	"user-read-email",
	"playlist-read-collaborative",
	"playlist-modify-public",
	"playlist-read-private",
	"playlist-modify-private"
];

const hash = window.location.hash.substring(1).split('&')[0].split('=')[1];
console.log(hash);

class Login extends React.Component {

	render(){
		return <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&state=123`}>login</a>
	}
}

export default Login
