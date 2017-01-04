//selecting all the grid buttons out of the page. Any selector that starts with a period is searching the "class"
//attribute of the element.
var gridButtons = document.querySelectorAll(".grid-button");

//this is an array of elements so you can loop over them.
gridButtons.forEach(function(gridButton){
    gridButton.addEventListener('touchstart',function(event){
        console.log('touchstart!');
        gridButton.classList.add('blue');
    });
    gridButton.addEventListener('touchend',function(event){
        console.log('touchend!');
        gridButton.classList.remove('blue');
    });
});