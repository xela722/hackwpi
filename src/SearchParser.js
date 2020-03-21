const searchEndpoint = "https://api.spotify.com/v1/search"
let tracks = []
async function search(phrase, auth){
    //1) query api
    let reqHeaders = new Headers({
        "Accept": "application/json",
        "Content-Type": "applcation/json",
        "Authorization": "Bearer "+auth
    });
    if(phrase.length>0){

        const response = await fetch(searchEndpoint+"?query="+phrase+"&type=track", {
            method:"GET",
            headers: reqHeaders
        })
        const json = await response.json()

        for(let i =0; i<json.tracks.items.length; i++){
            tracks.push(json.tracks.items[i].name);
        }
        return tracks
    }
}

export default search;