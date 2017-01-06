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

//this is an array of elements so you can loop over them.
gridButtons.forEach(function(gridButton, i){
    gridButton.id = i;
	console.log(gridButton);
    gridButton.addEventListener('mousedown',function(event){
        console.log('onmousedown!' + gridButton);
				var audio = audioChannels.get(gridButton.id);
			  if (audio.paused) {
			      audio.play();
			  }else{
			      audio.currentTime = 0
			  }
        gridButton.classList.add('bg-blue');
    });
    gridButton.addEventListener('mouseup',function(event){
        console.log('onmouseup!');
        gridButton.classList.remove('bg-blue');
    });
});

var soundbankButtons = document.querySelectorAll(".top-button");

soundbankButtons.forEach(function(bankButton,i){
    bankButton.id = "bank-button-" + i;
    bankButton.addEventListener('click',function(event){
        deactivateSoundbankButton(currentSoundBank);
        currentSoundBank = i;
        bankButton.classList.add("activated");
    })
});
