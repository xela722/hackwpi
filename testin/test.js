//const testPhrase = "The fitness gram pacer test is a multi stage aerobic capacity test";
const testPhrase = "a b c d e f";

function getPhrases(phrase){
	let words = phrase.split(" ");
	let returnPhrases = [];


	for(let i=words.length; i>0; i--){
		let buffer = getPhrasesOfLength(phrase, i);
		for(let j=0; j<buffer.length; j++){
			returnPhrases.push(buffer[j]);
		}
	}

	console.log(returnPhrases);
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


getPhrases(testPhrase);
