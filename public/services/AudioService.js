
//map of all banks which contain Audio configurations 
var banks = new Map();

var getBanks = function(){
	return banks;
}

//add audio configuration with key (bankButton) 
var addConfigurationToBanks = function(banks, bankButton, map){
    banks.set(bankButton, map)
}

//delete an audio configuration given a key (bankButton)
var deleteConfigurationFromBanks = function(banks, bankButton){
    banks.delete(bankButton);
}

//get an audio configuration given a key (bankButton)
var getConfigurationFromBanks = function(banks, bankButton){
    banks.get(bankButton);
}


//add audio channel to an Audio coinfiguration
var addAudioChannel = function(audioConfiguration, launchButton, audioChannel){
    audioConfiguration.set(launchButton, audioChannel)
}

//delete single Audio channel given key (launchButton)
var deleteAudioChannel = function(audioConfiguration, launchButton){
    audioConfiguration.delete(launchButton)
}


//get single audio Channel given key (launchButton)
var getAudioChannel = function(launchButton){
    return audioConfiguration.get(button)
}

//Checks if a value is in the a map
var hasAudioChannel = function(audioChannel){
    return audioConfiguration.has(audioChannel)
}

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
