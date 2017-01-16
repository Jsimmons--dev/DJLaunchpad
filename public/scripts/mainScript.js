//global configuration variables
var currentSoundBank = 0;

function deactivateSoundbankButton(soundBankIndex){
    var bank = document.querySelector("#bank-button-"+soundBankIndex);
    bank.classList.remove("activated");
}

//selecting all the grid buttons out of the page. Any selector that starts with a period is searching the "class"
//attribute of the element.
var gridButtons = document.querySelectorAll(".grid-button");

//This is a map of audio channels. Each channel plays one sound
audioChannels = new Map();
audioChannels.set("0", new Audio("audio/Bass-Drum-1.wav"));
audioChannels.set("1", new Audio("audio/Closed-Hi-Hat-1.wav"));
audioChannels.set("2", new Audio("audio/Closed-Hi-Hat-2.wav"));
audioChannels.set("3", new Audio("audio/Crash-Cymbal-1.wav"));
audioChannels.set("4", new Audio("audio/E-Mu-Proteus-FX-Wacky-Snare.wav"));
audioChannels.set("5", new Audio("audio/Alesis-S4-Plus-Shark-Bass-C2.wav"));
audioChannels.set("6", new Audio("audio/Alesis-Fusion-Bass-C3.wav"));
audioChannels.set("7", new Audio("audio/Alesis-S4-Plus-5ths-Lead-C5.wav"));
audioChannels.set("8", new Audio("audio/Alesis-S4-Plus-Brassy-5th-C4.wav"));
audioChannels.set("9", new Audio("audio/Casio-VZ-10M-Astral-C2.wav"));


var gridPlatform = document.querySelector('#dj-pad');

var numberOfPads = 10;

for(var i = 0; i<numberOfPads;i++){
    var launchButton = document.createElement('launch-button');
    launchButton.setAttribute('id',new String(i));
    gridPlatform.appendChild(launchButton);
}

var soundbankButtons = document.querySelectorAll(".top-button");

soundbankButtons.forEach(function(bankButton,i){
    bankButton.id = "bank-button-" + i;
    bankButton.addEventListener('click',function(event){
        deactivateSoundbankButton(currentSoundBank);
        currentSoundBank = i;
        bankButton.classList.add("activated");
    })
});

var database = firebase.database();
var storage = firebase.storage();
var storageRef = storage.ref();
var soundsRef = storageRef.child("sounds");
console.log("storage", storage);
console.log("database", database);

function uploadSoundFiles(files){
    console.log("uploading files", files);
    for (var file of files){
        //TODO verify sound file type
        //push file to storage
        var ref = soundsRef.child(file.name);
        ref.put(file).then(function(snapshot){
            console.log("uploaded file", file.name, file, snapshot);
        });
        //push name to db
        //TODO check for duplicates
        database.ref("sounds").push().set(file.name);
    }
}

function getSoundName(sId, callback){
    //get sound name from id
    database.ref("sounds/" + sId).once('value').then(callback);
}

function createBlankBank(bId){
    database.ref("banks/" + bId).set({"sounds": ""});
}

function addSoundToBank(bId, sId){
    database.ref("banks/" + bId).set()
}




