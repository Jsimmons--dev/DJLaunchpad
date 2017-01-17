

//Create new baord config 

var boardConfig = new BoardConfig(2,5);

boardConfig.mapPadToSound(boardConfig.pads[0],new Audio("audio/Bass-Drum-1.wav"));
boardConfig.mapPadToSound(boardConfig.pads[1],new Audio("audio/Closed-Hi-Hat-1.wav"));
boardConfig.mapPadToSound(boardConfig.pads[2],new Audio("audio/Closed-Hi-Hat-2.wav"));
boardConfig.mapPadToSound(boardConfig.pads[3],new Audio("audio/Crash-Cymbal-1.wav"));
boardConfig.mapPadToSound(boardConfig.pads[4],new Audio("audio/E-Mu-Proteus-FX-Wacky-Snare.wav"));
boardConfig.currentBank = boardConfig.banks[1];
boardConfig.mapPadToSound(boardConfig.pads[0],new Audio("audio/Alesis-S4-Plus-Shark-Bass-C2.wav"));
boardConfig.mapPadToSound(boardConfig.pads[1],new Audio("audio/Alesis-Fusion-Bass-C3.wav"));
boardConfig.mapPadToSound(boardConfig.pads[2],new Audio("audio/Alesis-S4-Plus-5ths-Lead-C5.wav"));
boardConfig.mapPadToSound(boardConfig.pads[3],new Audio("audio/Alesis-S4-Plus-Brassy-5th-C4.wav"));
boardConfig.mapPadToSound(boardConfig.pads[4],new Audio("audio/Casio-VZ-10M-Astral-C2.wav"));
boardConfig.currentBank = boardConfig.banks[0];


//selecting all the grid buttons out of the page. Any selector that starts with a period is searching the "class"
//attribute of the element.
var gridButtons = document.querySelectorAll(".grid-button");

var gridPlatform = document.querySelector('#dj-pad');

for(var i = 0; i<boardConfig.numberOfPads;i++){
    var launchButton = document.createElement('launch-button');
    launchButton.setAttribute('id',new String(i));
    launchButton.boardConfig = boardConfig;
    launchButton.pad = boardConfig.pads[i];
    gridPlatform.appendChild(launchButton);
}

var banksContainer = document.querySelector("#top-buttons");

//global configuration variables
var currentBankButton; //RENAME

function deactivateSoundbankButton(currentSoundBank){
    if(currentSoundBank)currentSoundBank.classList.remove("activated");
}

for(let i=0; i<boardConfig.numberOfBanks;i++){
    var bank = document.createElement('div');
    bank.classList.add('top-button');
    bank.classList.add('violet');
    bank.addEventListener('click',function(event){
        deactivateSoundbankButton(currentBankButton);
        currentBankButton = this;
        boardConfig.currentBank = boardConfig.banks[i];
        this.classList.add("activated");
    });
    banksContainer.appendChild(bank);
}

var soundbankButtons = document.querySelectorAll(".top-button");

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
    var promise = database.ref("sounds/" + sId).once('value').then(function(snapshot){return snapshot.val();});
    if (callback){
        promise.then(callback);
    }
    return promise;
}

function getSoundDownloadURL(sId, callback){
    var promise = getSoundName(sId).then(function(name){
        return soundsRef.child(name).getDownloadURL();
    });
    if(callback){
        promise.then(callback);
    }
    return promise;
}
function getSound(sId, callback){
    var promise = getSoundDownloadURL(sId).then(function(url){
        return new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(){
                resolve(xhr.response);
            }
            xhr.open('GET', url);
            xhr.send();
        })
    });
    if (callback){
        promise.then(callback);
    }
    return promise;
}

getSound("-KaZp8Gvmsr7KD-mV1Ni").then(function(response){
    console.log("response", response);
})

function createBlankBank(bId){
    database.ref("banks/" + bId).set({"sounds": ""});
}

function addSoundToBank(bId, sId){
    database.ref("banks/" + bId).set()
}




function swipedetect(el, callback){

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        maxAllowedTime = 300, // maximum time allowed to travel that distance
        minAllowedTime = 100,
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= maxAllowedTime && elapsedTime > minAllowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

var body = document.querySelector("body");
swipedetect(body,(swipedir)=>{
    if(swipedir === "right"){
        body.style.background = "red";
    }
    else if(swipedir === "left"){
        body.style.background = "blue";
    }
});
