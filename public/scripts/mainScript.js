//selecting all the grid buttons out of the page. Any selector that starts with a period is searching the "class"
//attribute of the element.
var gridButtons = document.querySelectorAll(".grid-button");

//this is an array of elements so you can loop over them.
gridButtons.forEach(function(gridButton){
	console.log(gridButton);
    gridButton.addEventListener('mousedown',function(event){
        console.log('onmousedown!');
        gridButton.classList.add('bg-blue');
    });
    gridButton.addEventListener('mouseup',function(event){
        console.log('onmouseup!');
        gridButton.classList.remove('bg-blue');
    });
});