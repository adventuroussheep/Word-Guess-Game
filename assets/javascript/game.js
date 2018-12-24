var wordList = ["breath", "rain", "calm", "stretch", "relax"];

var wordList = wordList(Math.floor(Math.random()* wordList.length));

var answerArray = [];
for (var i = 0; i < wordList.length; i++) {
    answerArray[i] = "_";
}