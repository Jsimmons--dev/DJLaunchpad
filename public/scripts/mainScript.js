//global configuration variables
var currentSoundBank = 0;

function deactivateSoundbankButton(soundBankIndex){
    var bank = document.querySelector("#bank-button-"+soundBankIndex);
    bank.classList.remove("activated");
}

//selecting all the grid buttons out of the page. Any selector that starts with a period is searching the "class"
//attribute of the element.
var gridButtons = document.querySelectorAll(".grid-button");

//this is an array of elements so you can loop over them.
gridButtons.forEach(function(gridButton, i){
	gridButton.id = "grid-button-"+i;
    gridButton.addEventListener('mousedown',function(event){
        console.log('onmousedown!');
        console.log("my id is " + gridButton.id);
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